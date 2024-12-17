import { Types } from "mongoose";
export type Days = "Sat"| "Sun"| "Mon"|"Tue"|"Wed"|"Thu"|"Fri"
export interface IOfferedCourse {
    semsesterRegistration:Types.ObjectId;
    academicSemester:Types.ObjectId;
    academicfaculty:Types.ObjectId;
    academicDepartment:Types.ObjectId;
    course:Types.ObjectId;
    faculty:Types.ObjectId;
    maxCapacity:number;
    section:number;
    days:Days;
    startTime:string;
    endTime:string;
}