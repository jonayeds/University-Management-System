import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const result =await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully created an Academic Faculty",
        data:result
    })
})

const findAllAcademicFaculties = catchAsync(async(req:Request,res:Response)=>{
    const result =await AcademicFacultyServices.getAllAcademicFacultiesFromDB()
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all academic Faculties",
        data:result
    })
})

const findASingleAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const {academicFacultyId} = req.params
    const result = await AcademicFacultyServices.getASingleAcademicFaculty(academicFacultyId)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched a single Academic Faculty",
        data:result
    })
})

const updateAcademicFaculty = catchAsync(async(req:Request,res:Response)=>{
    const {academicFacultyId} = req.params
    const result = await AcademicFacultyServices.updateAcademicFAculty(academicFacultyId, req.body)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully updated an Academic Faculty",
        data:result
    })
})


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    findAllAcademicFaculties,
    findASingleAcademicFaculty,
    updateAcademicFaculty
}