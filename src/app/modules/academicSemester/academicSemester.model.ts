import { model, Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, months } from "./academicSemester.constant";


const academicSemesterSchema  = new Schema<IAcademicSemester>({
    name:{
        type:String,
        enum:academicSemesterName,
        required:true
    },
    code:{
        type:String,
        enum:academicSemesterCode,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    startMonth:{
        type:String,
        enum: months,
        required:true
    },
    endMonth:{
        type:String,
        enum:months,
        required:true
    },
},{timestamps:true}) 

academicSemesterSchema.pre("save", async function(next){
    const isSemesterExist =await AcademicSemester.findOne({
        name:this.name,
        year:this.year
    })
    if(isSemesterExist){
        throw new Error("Semester is already exist")
    }
    next()
})



export const AcademicSemester = model<IAcademicSemester>("AcademicSemester", academicSemesterSchema) 