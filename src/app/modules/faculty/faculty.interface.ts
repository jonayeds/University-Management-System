import { Types } from "mongoose";
import { TUsername } from "../student/student.interface";

export interface IFaculty{
    name:TUsername,
    id:string,
    user:Types.ObjectId
    email:string,
    contactNumber:string,
    pressentAddress:string,
    permanentAddress:string,
    gender:"Male"| "Female",
    profile:string
    isDeleted:boolean
}