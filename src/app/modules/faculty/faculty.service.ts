/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { IFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"
import { AppError } from "../../errors/appError"
import { User } from "../user/user.model"

const getAllFacultiesFromDB = async(query:Record<string,unknown>)=>{
    const searchableFields = ["name.firstName", "name.lastName", "email"]
    const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result  = await facultyQuery.modelQuery
    return result
}
const getASingleFaculty = async(facultyId:string)=>{
    const result = await Faculty.findOne({id:facultyId})
    return result
}

const updateFaculty = async(facultyId:string, payload:Partial<IFaculty>)=>{
    const {name, ...remaininFacultyData} = payload
    const modifiedFacultyData:Record<string,unknown> = {...remaininFacultyData}
    if(name && Object.keys(name).length){
        for(const [key,val] of Object.entries(name)){
            modifiedFacultyData[`name.${key}`] = val
        }
    }
    const result  = await Faculty.findOneAndUpdate({id:facultyId}, modifiedFacultyData, {new:true,runValidators:true})
    return result
}

const deleteFaculty = async(facultyId:string)=>{
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deletedUser = await User.findByIdAndUpdate({id:facultyId},{isDeleted:true},{new:true, session})
        if(!deletedUser){
            throw new AppError(500, "Failed to delete user")
        }
        const deletedFaculty = await Faculty.findOneAndUpdate({id:facultyId},{isDeleted:true}, {new:true, session})
        if(!deletedFaculty){
            throw new AppError(500,"Failed to Delete Faculty")
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedFaculty
    } catch (error:any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}

export const FacultyServices = {
    getAllFacultiesFromDB,
    getASingleFaculty,
    updateFaculty,
    deleteFaculty
} 