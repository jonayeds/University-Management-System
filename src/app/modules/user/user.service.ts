/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import { AppError } from '../../errors/appError';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const crateStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  // if password is not given, using default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(
      admissionSemester as IAcademicSemester,
    );

    // create a user (transection-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(500, 'Falied to create user');
    }

    // set id and _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (Transection-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(500, 'Falied to create student');
    }
    //  console.log("k")
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err);
  }
};

const createFacultyIntoDB = async(password:string, payLoad:IFaculty)=>{
  const userData:Partial<IUser> = {}

  userData.password = password || (config.default_password as string)
  userData.role = "faculty"

  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    userData.id = await generateFacultyId()
    const newUser = await User.create([userData], {session})
    if(!newUser.length){
      throw new AppError(500, "Failed to create user")
    }
    payLoad.id = newUser[0].id
    payLoad.user = newUser[0]._id

    const newFaculty = await Faculty.create([payLoad],{session})
    if(!newFaculty.length){
      throw new AppError(500,"Failed to create Faculty")
    }
    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  }catch(err:any){
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, err);
  }
}
  
const createAdminIntoDB = async(password:string, payLoad:IAdmin)=>{
  const userData:Partial<IUser> = {}

  userData.password = password || (config.default_password as string)
  userData.role = "admin"

  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    userData.id = await generateAdminId()
    const newUser = await User.create([userData], {session})
    if(!newUser.length){
      throw new AppError(500, "Failed to create user")
    }
    payLoad.id = newUser[0].id
    payLoad.user = newUser[0]._id
    
    const newAdmin = await Admin.create([payLoad],{session})
    if(!newAdmin.length){
      throw new AppError(500,"Failed to create Admin")
    }
    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  }catch(err:any){
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, err);
  }
}



export const UserServices = {
  crateStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
}
