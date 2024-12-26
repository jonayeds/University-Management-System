
import { model, Schema } from "mongoose";
import { ICourseMarks, IEnrolledCourse } from "./enrolledCourse.interface";
import { Grade } from "./enrolledCourse.constant";

const courseMarksSchema = new Schema<ICourseMarks>({
    classTest1:{
        type:Number,
        default:0
    },
    midTerm:{
        type:Number,
        default:0
    },
    classTest2:{
        type:Number,
        default:0
    },
    finalTerm:{
        type:Number,
        default:0
    },
})


const enrolledCourseSchema = new Schema<IEnrolledCourse>({
    semesterRegistration:{
        type:Schema.Types.ObjectId,
        ref:"SemesterRegistration",
        required:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty",
        required:true
    },
    academicSemester:{
        type:Schema.Types.ObjectId,
        ref:"AcademicSemester",
        required:true
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:"Faculty",
        required:true
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    offeredCourse:{
        type:Schema.Types.ObjectId,
        ref:"OfferedCourse",
        required:true
    },
    isEnrolled:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    courseMarks:{
        type:courseMarksSchema,
        required:true
    },
    grade:{
        type:String,
        enum:Grade,
        required:true
    },
    gradePoints:{
        type:Number,
        default:0,
        min:0,
        max:4
    }
})

export const EnrolledCourse = model<IEnrolledCourse>("EnrolledCourse", enrolledCourseSchema)