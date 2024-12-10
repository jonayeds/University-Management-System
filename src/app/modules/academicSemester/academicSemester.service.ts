import QueryBuilder from "../../builder/QueryBuilder"
import { academicSemesterNameCodeValidation } from "./academicSemester.constant"
import { IAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"



const createAcademicSemesterIntoDB = async(payLoad:IAcademicSemester)=>{
    
    if(academicSemesterNameCodeValidation[payLoad.name] !== payLoad.code){
        throw new Error("Invalid semester code")
    }
    const result = await AcademicSemester.create(payLoad)
    return result    
}

const getAllAcademicSemesterFromDB = async(query:Record<string,unknown>)=>{
    const searchableFields = ["year","name", "code"]
    const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(),query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    
    const result = await academicSemesterQuery.modelQuery
    return result
}

const getASingleSemesterFromDB = async(semesterId:string)=>{
    const result = await AcademicSemester.findById(semesterId)
    return result
}

const updateAcademicSemester = async(semesterId:string, updateData:Partial<IAcademicSemester>)=>{
    if(updateData.name && 
        updateData.code &&
        academicSemesterNameCodeValidation[updateData.name] !== updateData.code
    ){
        throw new Error("Invalid semester code");
    }
    const result = await AcademicSemester.findByIdAndUpdate(semesterId, updateData,{new:true})
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getASingleSemesterFromDB,
    updateAcademicSemester
}