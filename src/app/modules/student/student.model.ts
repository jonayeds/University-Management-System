import { Schema, model } from 'mongoose';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUsername,
} from './student.interface';

const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'First name needed'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String }, 
  motherContactNo: { type: String },
  motherOccupation: { type: String },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  address: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user:{
    type:Schema.Types.ObjectId,
    required:[true, "User Id is required"],
    unique:true,
    ref:"User"
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contactNumber: { type: String, required: true, trim: true },
  emergencyContact: { type: String, required: true, trim: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    ref:"AcademicSemester",
  }
},

{
  toJSON:{
    virtuals:true
  }
});

// mongoose virtual
studentSchema.virtual("fullName").get(function(){
  return this.name.firstName+this.name.middleName+this.name.lastName
})








// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: false });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: false });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
