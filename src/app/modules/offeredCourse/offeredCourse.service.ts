import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/appError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourse = async (payload: IOfferedCourse) => {
    // check if semesterRegistration exists'
    const isSemesterRegistrationExists = await SemesterRegistration.findById(payload.semesterRegistration)
    if(!isSemesterRegistrationExists){
        throw new AppError(404,"Registered semester not found")
    }
    // check if AcademicFaculty exists'
    const isAcademicFacultyExists = await AcademicFaculty.findById(payload.academicFaculty)
    if(!isAcademicFacultyExists){
        throw new AppError(404,"Academic faculty not found")
    }
    // check if AcademicDepartment exists'
    const isAcademicDepartmentExists = await AcademicDepartment.findById(payload.academicDepartment)
    if(!isAcademicDepartmentExists){
        throw new AppError(404,"Academic department not found")
    }
    // check if Course exists'
    const isCourseExists = await Course.findById(payload.course)
    if(!isCourseExists){
        throw new AppError(404,"course not found")
    }
    // check if Faculty exists'
    const isFacultyExists = await Faculty.findById(payload.faculty)
    if(!isFacultyExists){
        throw new AppError(404,"Faculty not found")
    }
    // check if the department is belong to the faculty
    if(isAcademicDepartmentExists.academicFaculty.toString() !== isAcademicFacultyExists._id.toString()){
        throw new AppError(500,"Academic department does not belong to the academic Faculty")
    }
    // check if the same couse with the same section already offered
    const isSameOfferedCourseExist = await OfferedCourse.findOne({
        semesterRegistration:payload.semesterRegistration,
        course:payload.course,
        section:payload.section
    })
    if(isSameOfferedCourseExist){
        throw new AppError(400,"Same offered course already exist")
    }

    // check is there any time confliction for faculty
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration:payload.semesterRegistration,
        faculty:payload.faculty,
        days:{$in:payload.days}
    }).select("days startTime endTime")
    assignedSchedules.forEach((shcedule)=>{
        const existingStartTime = new Date(`1970-01-01T${shcedule.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${shcedule.startTime}`)
        const newStartTime = new Date(`1970-01-01T${payload.startTime}`)
        const newEndTime = new Date(`1970-01-01T${payload.endTime}`)
        if(newStartTime<=existingEndTime && newEndTime>=existingStartTime){
            throw new AppError(400,"Faculty already occupied at the same time")
        }
    })
    payload.academicSemester = isSemesterRegistrationExists.academicSemester
  const result = await OfferedCourse.create(payload);
  return result;
};

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const searchableFields = ['section', 'startTime', 'endTime'];
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate('course')
      .populate('faculty')
      .populate('academicDepartment')
      .populate('semesterRegistration'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getASingleOfferedCourse = async(id:string)=>{
    const result = await  OfferedCourse.findById(id)
    return result
}

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getASingleOfferedCourse,
};
