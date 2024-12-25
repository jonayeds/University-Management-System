/* eslint-disable no-unused-vars */

import { Model } from "mongoose";
import { User_role } from "./user.constant";

export interface IUser{
    id:string;
    email:string;
    password:string;
    passwordChangedAt?:Date;
    needsPasswordChange:boolean;
    role:"admin"| "student" | "faculty";
    isDeleted:boolean;
    status:"inProgress"| "blocked"
}
export type TUserRole = keyof typeof User_role;
export interface IUserModel extends Model<IUser>{
    isUserExistsByCustomId(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimeStamp:Date, jwtIssuedTimeStamp:number):boolean
}

export interface NewUser {
    role:string;
    password?:string;
    id:string
}