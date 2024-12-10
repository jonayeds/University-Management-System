import { z } from "zod";

const adminNameValidation = z.object({
    firstName:z.string(),
    middleName:z.string().optional(),
    lastName:z.string()
})
const updateAdminNameValidation = z.object({
    firstName:z.string().optional(),
    middleName:z.string().optional(),
    lastName:z.string().optional()
})

const createAdminValidation = z.object({
    body:z.object({
        admin:z.object({
            name:adminNameValidation,
            email:z.string().email({message:"Email is not valid"}).optional(),
            contactNumber:z.string().regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }),
            gender:z.enum(["Male","Female"]),
            presentAddress:z.string(),
            permanetAddress:z.string().optional(),
            profile:z.string().optional()
        }),
        password:z.string().min(6)
    })
})
const updateAdminValidation = z.object({
    body:z.object({
        name:updateAdminNameValidation.optional(),
        email:z.string().email({message:"Email is not valid"}).optional(),
        contactNumber:z.string().regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }).optional(),
        gender:z.enum(["Male","Female"]).optional(),
        presentAddress:z.string().optional(),
        permanetAddress:z.string().optional(),
        profile:z.string().optional()
    }),
})


export const AdminValidations = {
    createAdminValidation,
    updateAdminValidation
}