import { Types } from "mongoose";
import { TUsername } from "../student/student.interface";

export interface IFaculty{
    name:TUsername,
    id:string,
    academicDepartment:Types.ObjectId,
    user:Types.ObjectId
    email:string,
    contactNo:string,
    address:string,
    gender:"Male"| "Female"
}