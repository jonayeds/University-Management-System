/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppError } from "../../errors/appError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { SemesterRegistrationStatusObj } from "./semesterRegistration.constant"
import { OfferedCourse } from "../offeredCourse/offeredCourse.model"
import mongoose from "mongoose"

const createSemesterRegistrationIntoDB = async(payload:ISemesterRegistration)=>{
    const academicSemester = payload?.academicSemester

    // check if there any registered semester date is upcoming or ongoing
    const isThereAnyUpCommingOnOnGoing = await SemesterRegistration.findOne({
        $or:[
            {status:SemesterRegistrationStatusObj.UPCOMING},
            {status:SemesterRegistrationStatusObj.ONGOING}
        ]
    })
    if(isThereAnyUpCommingOnOnGoing){
        throw new AppError(500,`There is already a ${isThereAnyUpCommingOnOnGoing.status} Semester`)
    }
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
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id)
    if(!isSemesterRegistrationExist){
        throw new AppError(404,"Semester is not found")
    }
    // if the requested semester is  --> ca not update regitration
    if(isSemesterRegistrationExist.status === SemesterRegistrationStatusObj.ENDED){
        throw new AppError(500, "This semester is already Ended")
    }
    if((isSemesterRegistrationExist.status === SemesterRegistrationStatusObj.UPCOMING && payload.status === SemesterRegistrationStatusObj.ENDED) ||
    (isSemesterRegistrationExist.status === SemesterRegistrationStatusObj.ONGOING && payload.status ===SemesterRegistrationStatusObj.UPCOMING) ){
        throw new AppError(400,`Cannot set status from ${isSemesterRegistrationExist.status} to ${payload.status}`)
    }

    const result  =await SemesterRegistration.findByIdAndUpdate(id, payload)
    return result 
}

const deleteSemesterRegistration = async(id:string)=>{
    // checking status of the registered semester
    const registeredSemesterStatus = await SemesterRegistration.findById(id)
    if(!registeredSemesterStatus){
        throw new AppError(404, `Semester Registration not found`)
    }
    if(registeredSemesterStatus?.status !== "UPCOMING"){
        throw new AppError(400, `Cannot delete an ${registeredSemesterStatus?.status} Semester`)
    }
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        // fetching and deleting all offered courses in the registered semseter
    await OfferedCourse.deleteMany({semesterRegistration:id})
    const result = await SemesterRegistration.findByIdAndDelete(id)
    await session.commitTransaction()
    await session.endSession()
    return result
    } catch (error :any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500,error)
    }
    
}

export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getASingleSemesterRegistrationFromDB,
    getAllSemesterRegistrationsFromDB,
    updateSemesterRegistration,
    deleteSemesterRegistration
}