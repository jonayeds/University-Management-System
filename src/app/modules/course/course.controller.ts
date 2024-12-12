import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req,res)=>{
    const result  = await CourseServices.createCourseIntoDB(req.body)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully created Course.",
        data:result
    })
})

const getAllCourses = catchAsync(async (req, res)=>{
    const result = await CourseServices.getAllCoursesFromDB()
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all Courses",
        data:result
    })
})
const getASingleCourse = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await CourseServices.getASingleCourseFromDB(id)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched A single course",
        data:result
    })
})

// const updateCourse = catchAsync(async (req,res)=>{
//     const {id} = req.params
//     const result = await CourseServices
//     response(res,{
//         statusCode:200,
//         success:true,
//         message:"Successfully fetched all Faculties",
//         data:result
//     })
// })

const deleteCourse = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await CourseServices.deleteCourseFromDB(id)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully deleted Course",
        data:result
    })
})

export const FacultyControllers = {
    createCourse,
    getAllCourses,
    getASingleCourse,
    deleteCourse
}