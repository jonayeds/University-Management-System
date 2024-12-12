import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { ICourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB= async(payload:ICourse)=>{
    const result = (await Course.create(payload)).populate("preRequisiteCourses.course")
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

const updateCourseIntoDB = async (id:string, payload:Partial<ICourse>)=>{
    const {preRequisiteCourses, ...remainingCourseData} = payload
    if(preRequisiteCourses && preRequisiteCourses.length){
        //filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses.filter(course=>course.course && course.isDeleted).map(el=>el.course)
        
        await Course.findByIdAndUpdate(id,{
            $pull:{preRequisiteCourses:{ course:{ $in: deletedPreRequisites } }}
        })
        
        //Filter out new couses
        const newPreRequisites = preRequisiteCourses.filter(el => el.course && !el.isDeleted)
        await Course.findByIdAndUpdate(id, {
            $addToSet:{preRequisiteCourses:{$each: newPreRequisites}}
        })
    }
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id,remainingCourseData,{new:true, runValidators:true})
    
    return updatedBasicCourseInfo 
}

const deleteCourseFromDB = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id, {isDeleted:true},{new:true})
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getASingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
}