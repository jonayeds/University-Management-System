import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { AppError } from "../../errors/appError";


const createStudent =catchAsync(async (req, res) => {
  const { student:studentData, password} = req.body;
      const result = await UserServices.crateStudentIntoDB(password, studentData);
      response(res, {
        success: true,
        message: 'Successfully created a student',
        data: result,
        statusCode: 200,
      });
  });

  const createFaculty = catchAsync(async(req,res)=>{
    const {faculty, password}= req.body
    const result = await UserServices.createFacultyIntoDB(password,faculty)
    response(res,{
      success:true,
      message:"Successfully created a Faculty",
      data:result,
      statusCode:200
    })

  })
  const createAdmin = catchAsync(async(req,res)=>{
    const {admin, password}= req.body
    const result = await UserServices.createAdminIntoDB(password,admin)
    response(res,{
      success:true,
      message:"Successfully created a Admin",
      data:result,
      statusCode:200
    })

  })
  const getMe = catchAsync(async(req,res)=>{
    const token = req.headers.authorization
    if(!token){
      throw new AppError(404, "Token not found")
    }
    const result = await UserServices.getMe(token)
    response(res,{
      success:true,
      message:"Successfully fetched your data",
      data:result,
      statusCode:200
    })

  })


  export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe
  }