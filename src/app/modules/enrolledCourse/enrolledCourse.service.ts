import { JwtPayload } from "jsonwebtoken"
import { OfferedCourse } from "../offeredCourse/offeredCourse.model"
import { AppError } from "../../errors/appError"
import { EnrolledCourse } from "./enrolledCourse.model"
import { Student } from "../student/student.model"
import { IEnrolledCourse } from "./enrolledCourse.interface"
import mongoose, { Types } from "mongoose"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"

const createEnrolledCourse = async(user:JwtPayload, payload:IEnrolledCourse)=>{
    const {id} = user
    // check if the offered course Exists
    const {offeredCourse} = payload
    const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse)
    if(!isOfferedCourseExist){
        throw new AppError(404,"Offered course not found")
    }
    const {academicDepartment,academicFaculty, academicSemester, semesterRegistration,course, faculty, maxCapacity} = isOfferedCourseExist
    //  check if the student already enrolled
    const student = await Student.findOne({id},{_id:1})
    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        student:student?._id,
        semesterRegistration:isOfferedCourseExist.semesterRegistration,
        offeredCourse,
    })
    if(isStudentAlreadyEnrolled){
        throw new AppError(400,"Student already enrolled this course")
    }
    // checking max capacity
    if(isOfferedCourseExist.maxCapacity <= 0){
        throw new AppError(400,"Classroom is full")
    }

    // check if total creadits exceeds max credit
    const registeredSemester = await SemesterRegistration.findById(semesterRegistration).select("maxCredit")
    const enrollCourses = await EnrolledCourse.aggregate([
        {
            $match:{
                semesterRegistration,
                student:student?._id,
            },
        },
        {
            $lookup:{
                from:"courses",
                localField:"course",
                foreignField:"_id",
                as:"alreadyEnrolledCourses"
            }
        },
        {
            $unwind:"$alreadyEnrolledCourses"
        },
        {
            $group:{
                _id:null, totalEnrolledCredits : {$sum:"$alreadyEnrolledCourses.credits"}
            }
        },
        {
            $project:{
                _id:0,
                totalEnrolledCredits:1
            }
        }
    ])
    // console.log(enrollCourses[0].totalEnrolledCredits)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        // creating An enrolled course
    payload.student = student?._id as Types.ObjectId
    const result = await EnrolledCourse.create({
        student:payload.student,
        isEnrolled:true,
        offeredCourse,
        academicDepartment,
        academicFaculty,
        academicSemester,
        semesterRegistration,
        course,
        faculty,
    })
    if(!result){
        throw new AppError(500,"Failed to enroll this course")
    }
    const newCapacity = maxCapacity-1
    const updatedOfferedCourse = await OfferedCourse.findByIdAndUpdate(offeredCourse, {maxCapacity:newCapacity})
    if(!updatedOfferedCourse){
        throw new AppError(500,"Failed to enroll this course")
    }
    await session.commitTransaction()
    await session.endSession()
    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500,error)
    }
    
}

export const EnrolledCourseServices = {
    createEnrolledCourse
}