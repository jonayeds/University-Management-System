import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../errors/appError";

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty"
    }
},{timestamps:true})

academicDepartmentSchema.pre("save", async function(next){
    const isDepartmentExist =await AcademicDepartment.findOne({name:this.name})
    if(isDepartmentExist){
        throw new Error("Department already exists")
    }
    next()
})

academicDepartmentSchema.pre("findOneAndUpdate", async function name(next) {
    const query  = this.getQuery()
    const isDepartmentExist = await AcademicDepartment.findOne(query)
    if(!isDepartmentExist){
        throw new AppError(404,"Department doesnot exist");
    }
    next()
})






export const AcademicDepartment = model<IAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)
