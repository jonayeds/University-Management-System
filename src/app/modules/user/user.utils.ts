import { IAcademicSemester } from "../academicSemester/academicSemester.interface"
import { User } from "./user.model"

const findLastStudentId = async()=>{
     const lastStudent = await User.findOne({
          role:"student",
          
     },{
          id:1,
          _id:0
     })
     .sort({
          createdAt:-1
     })
     .lean()
     return lastStudent?.id ? lastStudent.id : undefined
}


 // generate student id --> 2023 02 0002
 export const generateStudentId = async(payload:IAcademicSemester)=>{
      let currentId  = (0).toString()
      const lastStudentId = await findLastStudentId()
      const lastStudentSemesterCode = lastStudentId?.substring(4,6)
      const lastStudentYear = lastStudentId?.substring(0,4)
      if(lastStudentId && 
          lastStudentSemesterCode === payload.code && 
          lastStudentYear === payload.year)
          {
               currentId = lastStudentId.substring(6) 
          }
     let incrementId = (Number(currentId)+1).toString().padStart(4,"0")

     incrementId = `${payload.year}${payload.code}${incrementId}`;
      return incrementId
 }