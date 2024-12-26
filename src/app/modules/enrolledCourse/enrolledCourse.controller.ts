import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";

const createEnrolledCourse = catchAsync(async (req,res)=>{
    response(res,{
        success:true,
        message:"Successfully created EnrolledCourse",
        statusCode:200,
        data:{}
    })
})

export const EnrolledCourseControllers = {
    createEnrolledCourse
}