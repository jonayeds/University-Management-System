import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    // checking is the token exist
    if (!accessToken) {
      throw new AppError(403, 'Unauthorized request');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      accessToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, id, iat } = decoded;

    const user = await User.isUserExistsByCustomId(id);
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(403, 'You are not authorized');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized');
    }
    req.query.user = decoded as JwtPayload;

    if (!user) {
      throw new AppError(404, 'User not found');
    }
    if (user.status === 'blocked') {
      throw new AppError(400, 'User is blocked');
    }
    next();
  });
};
