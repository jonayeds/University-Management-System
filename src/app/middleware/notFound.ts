/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
// import status from "http-status";

export const notFound = (req:Request, res:Response, next:NextFunction)=>{
    res
    .status(404)
    .json({
        success:false,
        message:"Route not found",
        error:""
    })
    
}