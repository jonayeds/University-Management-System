/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { AppError } from "../errors/appError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { TUserRole } from "../modules/user/user.interface"

export const auth = (...requiredRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const accessToken = req.headers.authorization
        // checking is the token exist
        if(!accessToken){
            throw new AppError(403,"Unauthorized request")
        }
        // check if the token is valid
        jwt.verify(accessToken, config.jwt_access_secret as string, function(err, decoded){
            if(err){
                throw new AppError(403, "You are not authorized")
            }
            const role = (decoded as JwtPayload).role
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(403,"You are not authorized")
            }
            req.query.user = decoded as JwtPayload
        })

        next()
})
}