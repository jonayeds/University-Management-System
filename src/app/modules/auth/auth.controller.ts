import { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const userLogin = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  response(res, {
    success: true,
    message: 'Successfully Logged in',
    statusCode: 200,
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user = req.query.user;
  const passwordData = req.body;
  const result = await AuthServices.changePassword(
    user as JwtPayload,
    passwordData,
  );

  response(res, {
    success: true,
    message: 'Password is updated successfully',
    statusCode: 200,
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  response(res, {
    success: true,
    message: 'Access token is retrieved successfully ',
    statusCode: 200,
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await AuthServices.forgetPassword(id);

  response(res, {
    success: true,
    message: 'Reset link is genarated successfully',
    statusCode: 200,
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthServices.resetPassword(req.body, token as string);

  response(res, {
    success: true,
    message: 'Password Reset successful',
    statusCode: 200,
    data: result,
  });
});

export const AuthController = {
  userLogin,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
