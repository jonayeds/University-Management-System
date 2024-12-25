import { model, Schema } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AppError } from '../../errors/appError';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const facultyId = this.getQuery();
  const isFacultyExist = await AcademicFaculty.findOne({ _id: facultyId });
  if (!isFacultyExist) {
    throw new AppError(404, 'Academic Faculty does not exist');
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
