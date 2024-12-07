/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/appError';
import { User } from '../user/user.model';


const getAllStudents = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  }).populate("user");
  return result;
};
const getASingleStudent = async (id: string) => {
  const result = await Student.findOne({id}).populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  }).populate("user");
  return result;
};
const deleteStudentFromDB = async(studentId:string)=>{
  if(!await Student.isUserExist(studentId)){
    throw new AppError(404,"Student Does not exists")
  }
  const session = await mongoose.startSession()
  try{
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate({id:studentId},{isDeleted:true},{new:true, session})
    if(!deletedStudent){
      throw new AppError(500,"Failed to delete a student")
    }
    const deletedUser = await User.findOneAndUpdate({id:studentId},{isDeleted:true},{new:true,session})
    if(!deletedUser){
      throw new AppError(500, "Failed to delete student")
    }
    await session.commitTransaction()
    await session.endSession()
    return deletedStudent

  }catch(err){
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentServices = {
  getAllStudents,
  getASingleStudent,
  deleteStudentFromDB,
};
