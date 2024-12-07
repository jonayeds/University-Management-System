
import { Student } from './student.model';


const getAllStudents = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  }).populate("user");
  return result;
};
const getASingleStudent = async (id: string) => {
  const result = await Student.findOne({id}).populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  }).populate("user");
  return result;
};
const deleteStudentFromDB = async(studentId:string, data:object)=>{
  const result = await Student.updateOne({id:studentId},{data})
  return result
}

export const studentServices = {
  getAllStudents,
  getASingleStudent,
  deleteStudentFromDB,
};
