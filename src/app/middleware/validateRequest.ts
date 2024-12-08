/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

export const requestValidator = (schema:AnyZodObject)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            // validation
            await schema.parseAsync({
                body:req.body
            })
            next()
        }catch(err:any){
            next(err)
        }
    }
}