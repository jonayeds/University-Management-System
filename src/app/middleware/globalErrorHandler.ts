/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interfaces/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleMongooseValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { AppError } from '../errors/appError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = err.message || err?.errors[0].message || 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }else if(err?.name === "ValidationError"){
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message= simplifiedError.message
    errorSource = simplifiedError.errorSource
  }else if(err?.name === "CastError"){
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSource= simplifiedError.errorSource
  }else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSource= simplifiedError.errorSource
  }else if(err instanceof AppError){
    statusCode = err.statusCode
    message = err.message
    errorSource= [{
      path:"",
      message:err?.message
    }]
  }else if(err instanceof Error){
    message = err.message
    errorSource= [{
      path:"",
      message:err?.message
    }]
  }


  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'Development' ? err?.stack : null,
  });
};
