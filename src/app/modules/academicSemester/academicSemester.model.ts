import { model, Schema } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';
import { AppError } from '../../errors/appError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(404, 'Semester is already exist');
  }
  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const semesterId = this.getQuery();
  const isFacultyExist = await AcademicSemester.findOne({ _id: semesterId });
  if (!isFacultyExist) {
    throw new AppError(404, 'Academic Faculty does not exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
