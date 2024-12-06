import { z } from "zod";

const userValidationSchema = z.object({
    password:z.string({invalid_type_error:"Password must be String"}).min(8,{message:"Password cannot be less than 6 characters"}).optional(),
})

export const UserValidation = {
    userValidationSchema
}