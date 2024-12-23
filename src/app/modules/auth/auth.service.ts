import { AppError } from "../../errors/appError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async(payload:ILoginUser)=>{
    const user = await User.isUserExistsByCustomId(payload.id)
    if(!user){
        throw new AppError(404,"User not found")
    }
    if(user.status ==="blocked"){
        throw new AppError(400,"User is blocked")
    }
    if(!await User.isPasswordMatched(payload.password, user.password)){
        throw new AppError(403, "Your password is wrong")
    }
    
    return {}

}

export const AuthServices = {
    loginUser
}