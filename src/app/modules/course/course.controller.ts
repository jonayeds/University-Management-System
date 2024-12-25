import { catchAsync } from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully created Course.',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Courses',
    data: result,
  });
});
const getASingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getASingleCourseFromDB(id);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched A single course',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Faculties',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully deleted Course',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesIntoCourses(
    courseId,
    faculties,
  );
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully assigned faculty',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesIntoCourses(
    courseId,
    faculties,
  );
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully removed faculty',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getASingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFaculties,
};
