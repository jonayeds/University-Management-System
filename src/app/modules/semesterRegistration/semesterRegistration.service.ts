import { AppError } from "../../errors/appError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"

const createSemesterRegistrationIntoDB = async(payload:ISemesterRegistration)=>{
    const academicSemester = payload?.academicSemester
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({academicSemester})
    if(isSemesterRegistrationExist){
        throw new AppError(500, "Semester ragistration already Done")
    }
    // check if the semester exist
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
    if(!isAcademicSemesterExist){
        throw new AppError(404,"Academic semester does not exist")
    }
    const result  =await SemesterRegistration.create(payload)
    return result 
}
const getAllSemesterRegistrationsFromDB = async()=>{
    const result  =await SemesterRegistration.find()
    return result 
}
const getASingleSemesterRegistrationFromDB = async(id:string)=>{
    const result  =await SemesterRegistration.findById(id)
    return result 
}
const updateSemesterRegistration = async(id:string, payload:Partial<ISemesterRegistration>)=>{
    const result  =await SemesterRegistration.findByIdAndUpdate(id, payload)
    return result 
}

export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getASingleSemesterRegistrationFromDB,
    getAllSemesterRegistrationsFromDB,
    updateSemesterRegistration
}