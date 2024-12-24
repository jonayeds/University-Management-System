import jwt from "jsonwebtoken"

export const createToken = (jwtPayload:{id:string,role:string }, secret:string, expiresIn:string)=>{
    jwt.sign(jwtPayload, secret, {expiresIn})
}