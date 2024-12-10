import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res)=>{
    const result = await FacultyServices.getAllFacultiesFromDB(req.query)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all Faculties",
        data:result
    })
})
const getASingleFaculty = catchAsync(async (req,res)=>{
    const {facultyId} = req.params
    const result = await FacultyServices.getASingleFaculty(facultyId)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all Faculties",
        data:result
    })
})

const updateFaculty = catchAsync(async (req,res)=>{
    const {facultyId} = req.params
    const result = await FacultyServices.updateFaculty(facultyId,req.body)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all Faculties",
        data:result
    })
})

const deleteFaculty = catchAsync(async (req,res)=>{
    const {facultyId} = req.params
    const result = await FacultyServices.deleteFaculty(facultyId)
    response(res,{
        statusCode:200,
        success:true,
        message:"Successfully fetched all Faculties",
        data:result
    })
})

export const FacultyControllers = {
    getAllFaculties,
    getASingleFaculty,
    updateFaculty,
    deleteFaculty
}