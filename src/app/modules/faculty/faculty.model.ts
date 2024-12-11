import { model, Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";
import { AppError } from "../../errors/appError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

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
        unique:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    presentAddress:{
        type:String,
        required:true
    },
    permanentAddress:{
        type:String,
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
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    profile:{
        type:String,
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        ref:"AcademicDepartment",
        required:true
    }
},{
    timestamps:true
})

facultySchema.pre("save", async function(next){
    const academicDepartment = await AcademicDepartment.findById(this.academicDepartment)
    if(!academicDepartment){
        throw new AppError(404, "Academic Department not found")
    }
    next()
})

export const Faculty = model<IFaculty>("Faculty", facultySchema)