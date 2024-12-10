import { model, Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";

const facultySchema = new Schema<IFaculty>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:"AcademicDepartment",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export const Faculty = model<IFaculty>("Faculty", facultySchema)