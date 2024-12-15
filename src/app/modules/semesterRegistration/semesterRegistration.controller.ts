import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
    response(res,{
        success:true,
        statusCode:200,
        message:"Successfully created SemesterRegistration",
        data:result
    })
})
const getAllSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB()
    response(res,{
        success:true,
        statusCode:200,
        message:"Successfully created SemesterRegistration",
        data:result
    })
})
const getASingleSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await SemesterRegistrationService.getASingleSemesterRegistrationFromDB(req.params.id)
    response(res,{
        success:true,
        statusCode:200,
        message:"Successfully created SemesterRegistration",
        data:result
    })
})
const updateSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await SemesterRegistrationService.updateSemesterRegistration(req.params.id, req.body)
    response(res,{
        success:true,
        statusCode:200,
        message:"Successfully created SemesterRegistration",
        data:result
    })
})

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getASingleSemesterRegistration,
    updateSemesterRegistration
}