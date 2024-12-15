import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"

const createSemesterRegistrationIntoDB = async(payload:ISemesterRegistration)=>{
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