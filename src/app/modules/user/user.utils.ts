import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      _id: 0,
      id: 1,
    },
  ).sort({ createdAt: -1 });
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

// generate student id --> 2023 02 0002
export const generateStudentId = async (payload: IAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  if (
    lastStudentId &&
    lastStudentSemesterCode === payload.code &&
    lastStudentYear === payload.year
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// Generate Faculty Id --> F - 0001
export const generateFacultyId = async () => {
  let id = '1';
  const lastFacultyId = await findLastFacultyId();
  if (lastFacultyId) {
    id = (Number(lastFacultyId.substring(2)) + 1).toString();
  }
  id = 'F-' + id.padStart(4, '0');

  return id;
};
