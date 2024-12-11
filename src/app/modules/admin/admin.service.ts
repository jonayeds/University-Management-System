/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { AppError } from "../../errors/appError"
import { User } from "../user/user.model"
import { Admin } from "./admin.model"
import { IAdmin } from "./admin.interface"

const getAllAdminsFromDB = async(query:Record<string,unknown>)=>{
    const searchableFields = ["name.firstName", "name.lastName", "email"]
    const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result  = await adminQuery.modelQuery
    return result
}
const getASingleAdmin = async(adminId:string)=>{
    const result = await Admin.findById(adminId)
    return result
}

const updateAdmin = async(adminId:string, payload:Partial<IAdmin>)=>{
    const {name, ...remainingAdminData} = payload
    const modifiedAdminData:Record<string,unknown> = {...remainingAdminData}
    if(name && Object.keys(name).length){
        for(const [key,val] of Object.entries(name)){
            modifiedAdminData[`name.${key}`] = val
        }
    }
    const result  = await Admin.findOneAndUpdate({id:adminId}, modifiedAdminData, {new:true,runValidators:true})
    return result
}

const deleteAdmin = async(adminId:string)=>{
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deletedUser = await User.findOneAndUpdate({id:adminId},{isDeleted:true},{new:true, session})
        if(!deletedUser){
            throw new AppError(500, "Failed to delete user")
        }
        const deletedAdmin = await Admin.findOneAndUpdate({id:adminId},{isDeleted:true}, {new:true, session})
        if(!deletedAdmin){
            throw new AppError(500,"Failed to Delete Admin")
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedAdmin
    } catch (error:any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}

export const AdminServices = {
    getAllAdminsFromDB,
    getASingleAdmin,
    updateAdmin,
    deleteAdmin
} 