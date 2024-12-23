/* eslint-disable no-unused-vars */

import { Model } from "mongoose";

export interface IUser{
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:"admin"| "student" | "faculty";
    isDeleted:boolean;
    status:"inProgress"| "blocked"
}

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
}

export interface NewUser {
    role:string;
    password?:string;
    id:string
}