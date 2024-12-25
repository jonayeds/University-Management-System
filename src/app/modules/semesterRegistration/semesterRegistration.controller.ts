import { catchAsync } from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Successfully created SemesterRegistration',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
      req.query,
    );
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Successfully created SemesterRegistration',
    data: result,
  });
});
const getASingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getASingleSemesterRegistrationFromDB(
      req.params.id,
    );
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Successfully created SemesterRegistration',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await SemesterRegistrationService.updateSemesterRegistration(
    id,
    updateData,
  );
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Successfully created SemesterRegistration',
    data: result,
  });
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.deleteSemesterRegistration(id);
  response(res, {
    success: true,
    statusCode: 200,
    message:
      'Successfully Deleted  SemesterRegistration with all the corresponding offered course',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getASingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
