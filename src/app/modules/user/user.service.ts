/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { AppError } from "../../errors/appError";

const crateStudentIntoDB = async (password:string , payload: TStudent) => {
  // create a user object
  const userData : Partial<IUser> = {};
  
  // if password is not given, using default password
  userData.password = password || config.default_password as string
  
  
  
  
  // set student role
  userData.role = "student"
  
  
  // find academic semester info 
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester) 
  
  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    // set generated id
    userData.id = await generateStudentId(admissionSemester as IAcademicSemester)
    
    // create a user (transection-1)
    const newUser  = await User.create([userData],{session})
    
    if(!newUser.length){
      throw new AppError(500,"Falied to create user")
    }
    
    // set id and _id as user 
    payload.id = newUser[0].id
    payload.user = newUser[0]._id


    // create a student (Transection-2)
     const newStudent = await Student.create([payload],{session})
     if(!newStudent.length){
      throw new AppError(500,"Falied to create student")
     }
    //  console.log("k")
      await session.commitTransaction()
     await session.endSession()
     return newStudent
   
} catch(err){
    await session.abortTransaction()
    await session.endSession()
    return null
}   

   
  };

  export const UserServices = {
    crateStudentIntoDB
  }