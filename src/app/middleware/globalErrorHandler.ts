/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError, ZodIssue } from "zod"
import { TErrorSource } from "../interfaces/error"
import config from "../config"

export const globalErrorHandler:ErrorRequestHandler =  (err,req, res, next) => {
    let statusCode = err.statusCode|| 500
    let message =  err.message || err?.errors[0].message  || "Something went wrong"

    let errorSource:TErrorSource=[{
      path:"",
      message:"Someything went wrong"
    }]

    const handleZodError = (error:ZodError)=>{
      const statusCode = 400
      const errorSource:TErrorSource = error.issues.map((issue:ZodIssue)=> {
        return {
          path: issue?.path[issue.path.length-1],
          message:issue?.message
        }
      })
      return {
        statusCode,
        message:"Validation Error",
        errorSource
      }
    }

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode
        message= simplifiedError.message
        errorSource= simplifiedError.errorSource
    }

    res.status(statusCode).json({
      success:false,
      message, 
      errorSource,
      stack:config.node_env ==="Development"? err?.stack :null
    }) 
  }