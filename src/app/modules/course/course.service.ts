import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { ICourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB= async(payload:ICourse)=>{
    const result = await Course.create(payload)
    return result
}

const getAllCoursesFromDB = async(query:Record<string,unknown>)=>{
    const coursesQuery = new QueryBuilder(Course.find().populate("preRequisiteCourses.course"),query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result  = await coursesQuery.modelQuery
    return result 
}

const getASingleCourseFromDB = async(id:string)=>{
    const result = await Course.findById(id).populate("preRequisiteCourses.course")
    return result 
}

const deleteCourseFromDB = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id, {isDeleted:true},{new:true})
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getASingleCourseFromDB,
    deleteCourseFromDB
}