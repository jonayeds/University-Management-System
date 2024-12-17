import QueryBuilder from '../../builder/QueryBuilder';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourse = async (payload: IOfferedCourse) => {
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
