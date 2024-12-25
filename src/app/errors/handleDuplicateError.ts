/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.errmsg.match(/name: "([^"]+)"/);
  const extractedMassege = match && match?.[1];
  const errorSource: TErrorSource = [
    {
      path: Object.keys(err.keyValue)?.[0],
      message: `${extractedMassege} already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleDuplicateError;
