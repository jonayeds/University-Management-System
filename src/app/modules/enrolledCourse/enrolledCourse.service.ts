import { JwtPayload } from "jsonwebtoken"
import { OfferedCourse } from "../offeredCourse/offeredCourse.model"
import { AppError } from "../../errors/appError"
import { EnrolledCourse } from "./enrolledCourse.model"
import { Student } from "../student/student.model"
import {  IEnrolledCourse } from "./enrolledCourse.interface"
import mongoose, { Types } from "mongoose"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import { Course } from "../course/course.model"
import { Faculty } from "../faculty/faculty.model"
import { calculateGradePoints } from "./enrolledCourse.utils"

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
    const enrolledCourse = await Course.findById(course).select("credits")
    const totalCredits = enrollCourses.length>0? enrollCourses[0].totalEnrolledCredits : 0
    if(totalCredits && registeredSemester?.maxCredit && totalCredits+enrolledCourse?.credits > registeredSemester?.maxCredit  ){
        throw new AppError(400, "You have excided maximmum number of credits")
    }


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

const updateCourseMarks = async(facultyId:string, payload:Partial<IEnrolledCourse>)=>{
    const {semesterRegistration, offeredCourse, student, courseMarks} = payload
    const isEnrolledCourseExist = await EnrolledCourse.findOne({
        semesterRegistration,
        student,
        offeredCourse
    })
    if(!isEnrolledCourseExist){
        throw new AppError(404,"Enrolled course not found")
    }
    const faculty = await Faculty.findOne({id:facultyId}).select("_id")
    if(faculty?._id.toString() !== isEnrolledCourseExist.faculty.toString()){
        throw new AppError(403, "You are not authorized to update course marks")
    }

    
    const modifiedData: Record<string, unknown>= {}
    if(courseMarks && Object.keys(courseMarks).length){
        for(const [key,value] of Object.entries(courseMarks)){
            modifiedData[`courseMarks.${key}`] = value
        }
    }
    
    if(courseMarks?.finalTerm){
        const { classTest1, midTerm, classTest2} = isEnrolledCourseExist.courseMarks
        const totalMarks = (courseMarks.classTest1 ||classTest1)+ (courseMarks?.midTerm || midTerm)+ (courseMarks.classTest2 || classTest2) + courseMarks.finalTerm
        const {grade, gradePoints} = calculateGradePoints(totalMarks)
        modifiedData.grade = grade
        modifiedData.gradePoints = gradePoints
        modifiedData.isCompleted = true
    }

    const result  = await EnrolledCourse.findByIdAndUpdate(isEnrolledCourseExist._id, modifiedData, {new :true})
    return result
}

export const EnrolledCourseServices = {
    createEnrolledCourse,
    updateCourseMarks
}