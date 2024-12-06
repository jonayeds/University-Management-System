import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartment = async(payload:IAcademicDepartment)=>{
    const result = await AcademicDepartment.create(payload)
    return result
}

const getAllAcademicDepartments = async()=>{
    const result = await AcademicDepartment.find();
    return result
}

const getASingleAcademicDepartment = async(academicDepartmentId:string)=>{
    const result = await AcademicDepartment.findById(academicDepartmentId)
    return result 
}

const updateAcademicDepartment = async(academicDepartmentId:string, payload:Partial<IAcademicDepartment>)=>{
    const result = await AcademicDepartment.findByIdAndUpdate(academicDepartmentId, payload, {new:true})
    return result
}
export const AcademicDepartmentServices = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getASingleAcademicDepartment,
    updateAcademicDepartment
}