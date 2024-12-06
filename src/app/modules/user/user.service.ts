import config from "../../config";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const crateStudentIntoDB = async (password:string , payload: TStudent) => {
  // create a user object
  const userData : Partial<IUser> = {};
  
  // if password is not given, using default password
      userData.password = password || config.default_password as string
    

   

    // set student role
    userData.role = "student"
    

    // find academic semester info 
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester) 


    // set generated id
    userData.id = await generateStudentId(admissionSemester as IAcademicSemester)

    // create a user
    const newUser  = await User.create(userData)

    // create a student
    if(Object.keys(newUser).length){
      // set id and _id as user 
      payload.id = newUser.id
      payload.user = newUser._id
      const newStudent = await Student.create(payload)
      return newStudent
    }
  };

  export const UserServices = {
    crateStudentIntoDB
  }