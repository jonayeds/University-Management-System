
import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const userLogin = catchAsync(async(req,res)=>{
    const loginData = req.body
    const result = await AuthServices.loginUser(loginData)
    response(res, {
        success:true,
        message:"Successfully Logged in",
        statusCode:200,
        data:result
    })
})

export const AuthController = {
    userLogin
}