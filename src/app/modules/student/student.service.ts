/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/appError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudents = async (query:Record<string,unknown>) => {
  let searchTerm = "";
  const queryObj = {...query}
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }
  const studentsearchableFields = ["name.firstName","email","name.lastName"]
  
  const searchQuery = Student.find({
    $or:studentsearchableFields.map((field)=>({
      [field]:{ $regex:searchTerm, $options:"i"}
    }))
  })

  //filtering out non query properties from queryObj
  const excludeFields = ["searchTerm"]
  excludeFields.forEach(el=> delete queryObj[el])
  const result = await searchQuery.find(queryObj)

    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('user');
  return result;
};
const getASingleStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('user');
  return result;
};
const deleteStudentFromDB = async (studentId: string) => {
  if (!(await Student.isUserExist(studentId))) {
    throw new AppError(404, 'Student Does not exists');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(500, 'Failed to delete a student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(500, 'Failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500,"Failed to delete Student")
  }
};

const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const {name,guardian,localGuardian, ...remainingStudentData} = payload
  const modifiedUpdatedData : Record<string,unknown> = {
    ...remainingStudentData
  }
  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  const result = await Student.findOneAndUpdate({id:studentId},
    modifiedUpdatedData
  ,{
    new:true,
    runValidators:true
  })
  return result

};

export const studentServices = {
  getAllStudents,
  getASingleStudent,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
