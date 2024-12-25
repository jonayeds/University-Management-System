import config from '../../config';
import { AppError } from '../../errors/appError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from "jsonwebtoken"
const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (user.status === 'blocked') {
    throw new AppError(400, 'User is blocked');
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(403, 'Your password is wrong');
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const currentUser = await User.isUserExistsByCustomId(user.id);
  if (!currentUser) {
    throw new AppError(404, 'User not found');
  }
  if (currentUser.status === 'blocked') {
    throw new AppError(400, 'User is blocked');
  }
  if (
    !(await User.isPasswordMatched(payload.oldPassword, currentUser.password))
  ) {
    throw new AppError(403, 'Your password is wrong');
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_rounds),
  );
  await User.findOneAndUpdate(
    { id: user.id, role: user.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );
  return {};
};

const refreshToken = async(token: string) => {
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { id, iat } = decoded;

  const user = await User.isUserExistsByCustomId(id);
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(403, 'You are not authorized');
  }

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (user.status === 'blocked') {
    throw new AppError(400, 'User is blocked');
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {accessToken}
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
