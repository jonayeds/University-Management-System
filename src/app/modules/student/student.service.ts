
import { Student } from './student.model';


const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};
const getASingleStudent = async (id: string) => {
  const result = await Student.findOne({id});
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
