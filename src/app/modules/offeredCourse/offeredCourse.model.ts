import { model, Schema } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constant";

const offeredCourseSchema = new Schema<IOfferedCourse>({
    semsesterRegistration:{
        type:Schema.Types.ObjectId,
        ref:"SemesterRegistration",
        required:true
    },
    academicSemester:{
        type:Schema.Types.ObjectId,
        ref:"AcademicSemester",
        required:true
    },
    academicfaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty",
        required:true
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:"AcademicDepartment",
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    faculty:{
        type:Schema.Types.ObjectId,
        ref:"Faculty",
        required:true
    },
    maxCapacity:{
        type:Number,
        required:true
    },
    section:{
        type:Number,
        required:true
    },
    days:{
        type:String,
        enum:Days,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        requied:true
    }
},{
    timestamps:true
})

export const OfferedCourse = model<IOfferedCourse>("OfferedCourse", offeredCourseSchema)