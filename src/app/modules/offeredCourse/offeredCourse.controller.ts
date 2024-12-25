import { catchAsync } from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const offeredCourse = req.body;
  const result = await OfferedCourseService.createOfferedCourse(offeredCourse);
  response(res, {
    success: true,
    message: 'Successfully created offered course',
    statusCode: 200,
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await OfferedCourseService.getAllOfferedCourse(query);
  response(res, {
    success: true,
    message: 'Successfully fetched all offered course',
    statusCode: 200,
    data: result,
  });
});
const getASingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.getASingleOfferedCourse(id);
  response(res, {
    success: true,
    message: 'Successfully fetched a single offered course',
    statusCode: 200,
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await OfferedCourseService.updateOfferedCourse(updateData, id);
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Successfully updated Offered course',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getASingleOfferedCourse,
  updateOfferedCourse,
};
