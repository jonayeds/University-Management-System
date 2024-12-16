
import { AppError } from "../../errors/appError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"

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
const getAllSemesterRegistrationsFromDB = async(query:Record<string, unknown>)=>{
    const searchableFields = ["status"]
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester"), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result  =await semesterRegistrationQuery.modelQuery
    return result 
}
const getASingleSemesterRegistrationFromDB = async(id:string)=>{
    const result  =await SemesterRegistration.findById(id).populate("academicSemester")
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