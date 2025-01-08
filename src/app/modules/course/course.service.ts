/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculties } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/appError';

const createCourseIntoDB = async (payload: ICourse) => {
  const result = (await Course.create(payload)).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const coursesQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await coursesQuery.modelQuery;
  return result;
};

const getASingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (preRequisiteCourses && preRequisiteCourses.length) {
      //filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((course) => course.course && course.isDeleted)
        .map((el) => el.course);

      const deletedCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { session },
      );

      //Filter out new couses
      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );
      const addedCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { session },
      );
      if (!(deletedCourses || addedCourse)) {
        throw new AppError(500, 'failed to update preRequisiteCourses');
      }
    }
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true, session },
    ).populate('preRequisiteCourses.course');
    if (!updatedBasicCourseInfo) {
      throw new AppError(500, 'Failed to update basic info');
    }
    await session.commitTransaction();
    await session.endSession();
    return updatedBasicCourseInfo;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error);
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesIntoCourses = async (
  id: string,
  payload: Partial<ICourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    { upsert: true, new: true },
  );
  return result;
};
const getAssignedFacultiesIntoCourses = async (
  id: string,
) => {
  const result = await CourseFaculty.findOne({course:id}).populate("faculties");
  return result;
};

const removeFacultiesIntoCourses = async (
  id: string,
  payload: Partial<ICourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getASingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesIntoCourses,
  removeFacultiesIntoCourses,
  getAssignedFacultiesIntoCourses
};
