import { AppError } from '../../errors/appError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  const isAcademicFacultyExists = await AcademicFaculty.findById(payload.academicFaculty)
  if(!isAcademicFacultyExists){
    throw new AppError(404, "Academic faculty not found")
  }
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartments = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getASingleAcademicDepartment = async (academicDepartmentId: string) => {
  const result =
    await AcademicDepartment.findById(academicDepartmentId).populate(
      'academicFaculty',
    );
  return result;
};

const updateAcademicDepartment = async (
  academicDepartmentId: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    academicDepartmentId,
    payload,
    { new: true },
  );
  return result;
};
export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getASingleAcademicDepartment,
  updateAcademicDepartment,
};
