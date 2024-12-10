import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";


const adminNameSchema = {
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

const adminSchema = new Schema<IAdmin>({
    name:adminNameSchema,
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
    }
},{
    timestamps:true
})

export const Admin = model<IAdmin>("Admin", adminSchema)