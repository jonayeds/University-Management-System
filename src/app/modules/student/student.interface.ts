/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUsername = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};

export interface TStudent {
  id: string;
  user:Types.ObjectId
  name: TUsername;
  password:string;
  gender: 'Male' | 'Female';
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  avatar?: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId
  isDeleted:boolean
}


// for creating static
export interface StudentModel extends Model<TStudent>{
   isUserExist(id:string):Promise<TStudent|null>
}                  