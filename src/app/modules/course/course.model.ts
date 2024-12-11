import { model, Schema } from "mongoose";
import { ICourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const courseSchema = new Schema<ICourse>({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    prefix:{
        type:String,
        required:true,
        trim:true
    },
    code:{
        type:Number,
        required:true,
    },
    credits:{
        type:Number,
        required:true
    },
    preRequisiteCourses:[preRequisiteCoursesSchema]

},{timestamps:true})

export const Course = model<ICourse>("Course", courseSchema)