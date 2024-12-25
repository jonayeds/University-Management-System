import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/appError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict, TSchedule } from './offeredCourse.utils';

const createOfferedCourse = async (payload: IOfferedCourse) => {
  // check if semesterRegistration exists'
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    payload.semesterRegistration,
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'Registered semester not found');
  }
  // check if AcademicFaculty exists'
  const isAcademicFacultyExists = await AcademicFaculty.findById(
    payload.academicFaculty,
  );
  if (!isAcademicFacultyExists) {
    throw new AppError(404, 'Academic faculty not found');
  }
  // check if AcademicDepartment exists'
  const isAcademicDepartmentExists = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!isAcademicDepartmentExists) {
    throw new AppError(404, 'Academic department not found');
  }
  // check if Course exists'
  const isCourseExists = await Course.findById(payload.course);
  if (!isCourseExists) {
    throw new AppError(404, 'course not found');
  }
  // check if Faculty exists'
  const isFacultyExists = await Faculty.findById(payload.faculty);
  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty not found');
  }
  // check if the department is belong to the faculty
  if (
    isAcademicDepartmentExists.academicFaculty.toString() !==
    isAcademicFacultyExists._id.toString()
  ) {
    throw new AppError(
      500,
      'Academic department does not belong to the academic Faculty',
    );
  }
  // check if the same couse with the same section already offered
  const isSameOfferedCourseExist = await OfferedCourse.findOne({
    semesterRegistration: payload.semesterRegistration,
    course: payload.course,
    section: payload.section,
  });
  if (isSameOfferedCourseExist) {
    throw new AppError(400, 'Same offered course already exist');
  }

  // check is there any time confliction for faculty
  const newSchedule: TSchedule = {
    days: payload.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration: payload.semesterRegistration,
    faculty: payload.faculty,
    days: { $in: payload.days },
  }).select('days startTime endTime');
  const hasTimeConflicts = hasTimeConflict(assignedSchedules, newSchedule);
  if (hasTimeConflicts) {
    throw new AppError(400, 'Faculty already occupied at the same time');
  }
  payload.academicSemester = isSemesterRegistrationExists.academicSemester;
  const result = await OfferedCourse.create(payload);
  return result;
};

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const searchableFields = ['section', 'startTime', 'endTime'];
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate('course')
      .populate('faculty')
      .populate('academicDepartment')
      .populate('semesterRegistration'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getASingleOfferedCourse = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourse = async (
  payload: Pick<IOfferedCourse, 'faculty' | 'startTime' | 'days' | 'endTime'>,
  id: string,
) => {
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(404, 'Offered course not found ');
  }
  const isFacultyExist = await Faculty.findById(payload.faculty);
  if (!isFacultyExist) {
    throw new AppError(404, 'Offered course not found ');
  }
  const semsesterRegistrationStatus = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
  );
  if (
    semsesterRegistrationStatus?.status === 'ENDED' ||
    semsesterRegistrationStatus?.status === 'ONGOING'
  ) {
    throw new AppError(
      500,
      `Cannot update ${semsesterRegistrationStatus.status} Semester`,
    );
  }
  const newSchedule: TSchedule = {
    days: payload.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    faculty: payload.faculty,
    days: { $in: payload.days },
  }).select('days startTime endTime');
  const hasTimeConflicts = hasTimeConflict(assignedSchedules, newSchedule);
  if (hasTimeConflicts) {
    throw new AppError(400, 'Faculty already occupied at the same time');
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getASingleOfferedCourse,
  updateOfferedCourse,
};
