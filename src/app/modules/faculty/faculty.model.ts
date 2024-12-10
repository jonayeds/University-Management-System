import { model, Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";

const facultyNameSchema = {
    type:{
        firstName:{
            type:String,
            required:true
        },
        middleName:String,
        lastName:{
            type:String,
            required:true
        }
    },
    required:true
}

const facultySchema = new Schema<IFaculty>({
    name:facultyNameSchema,
    email:{
        type:String,
    },
    contactNo:{
        type:String,
        required:true
    },
    address:{
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
    },
    gender:{
        type:String,
        enum:["Male","Female"],
        required:true
    }
},{
    timestamps:true
})

export const Faculty = model<IFaculty>("Faculty", facultySchema)