import { Response } from 'express';

type ResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

export const response = <T>(res: Response, data: ResponseType<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message,
    data: data.data,
  });
};
