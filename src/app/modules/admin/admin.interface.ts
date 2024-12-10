import { Types } from "mongoose";
import { TUsername } from "../student/student.interface";

export interface IAdmin{
    name:TUsername,
    id:string,
    user:Types.ObjectId
    email:string,
    contactNumber:string,
    presentAddress:string,
    permanentAddress:string,
    gender:"Male"| "Female",
    profile:string
    isDeleted:boolean
}