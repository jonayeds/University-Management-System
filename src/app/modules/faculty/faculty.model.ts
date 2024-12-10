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
    contactNumber:{
        type:String,
        required:true
    },
    pressentAddress:{
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
    }
},{
    timestamps:true
})

export const Faculty = model<IFaculty>("Faculty", facultySchema)