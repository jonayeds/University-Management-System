import { catchAsync } from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Admin',
    data: result,
  });
});
const getASingleAdmin = catchAsync(async (req, res) => {
  const { AdminId } = req.params;
  const result = await AdminServices.getASingleAdmin(AdminId);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Admin',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.updateAdmin(adminId, req.body);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Admin',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdmin(adminId);
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully fetched all Admin',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getASingleAdmin,
  updateAdmin,
  deleteAdmin,
};
