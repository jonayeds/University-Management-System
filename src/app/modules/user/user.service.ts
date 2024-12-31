/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
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
import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCoudinary';

const crateStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<IUser> = {};
  // if password is not given, using default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if(!admissionSemester){
    throw new AppError(404, "Admission semester not found")
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id

    userData.id = await generateStudentId(
      admissionSemester as IAcademicSemester,
    );
    const imageName = userData.id + payload.name.firstName;

    // send image to cloudinary
    const image: any = await sendImageToCloudinary(file.path, imageName);

    // create a user (transection-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(500, 'Falied to create user');
    }

    // set id and _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = image.secure_url;

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

const createFacultyIntoDB = async (file:any, password: string, payLoad: IFaculty) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';
  userData.email = payLoad.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    // upload image to clloudinary
    const imageName = userData.id + payLoad.name.firstName;
    // send image to cloudinary
    const image: any = await sendImageToCloudinary(file.path, imageName);


    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;
    payLoad.profile = image.secure_url
    const newFaculty = await Faculty.create([payLoad], { session });
    if (!newFaculty.length) {
      throw new AppError(500, 'Failed to create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err);
  }
};

const createAdminIntoDB = async (file:any, password: string, payLoad: IAdmin) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  userData.email = payLoad.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    // uploading image to cloudinary
    const imageName = userData.id + payLoad.name.firstName;
    const image:any = sendImageToCloudinary(file.path, imageName)

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;
    payLoad.profile = image.secure_url

    const newAdmin = await Admin.create([payLoad], { session });
    if (!newAdmin.length) {
      throw new AppError(500, 'Failed to create Admin');
    }
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err);
  }
};

const getMe = async (user: JwtPayload) => {
  const { id, role } = user;
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id });
  } else if (role === 'admin') {
    result = await Admin.findOne({ id });
  } else if (role === 'faculty') {
    result = await Faculty.findOne({ id });
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  crateStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
