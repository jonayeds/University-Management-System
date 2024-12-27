import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req,res)=>{
   const result = await EnrolledCourseServices.createEnrolledCourse(req.query.user as JwtPayload, req.body)
    response(res,{
        success:true,
        message:"Successfully created EnrolledCourse",
        statusCode:200,
        data:result
    })
})

export const EnrolledCourseControllers = {
    createEnrolledCourse
}