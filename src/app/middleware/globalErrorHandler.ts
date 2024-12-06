/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

export const globalErrorHandler =  (err:any,_req:Request, res:Response, next:NextFunction) => {
    const statusCode =500
    const message =  err.message || err?.errors[0].message  || "Something went wrong"
    res.status(statusCode).json({
      success:false,
      message,
      error: err
    }) 
  }