import { z } from "zod";

const facultyNameValidation = z.object({
    firstName:z.string(),
    middleName:z.string().optional(),
    lastName:z.string()
})
const updateFacultyNameValidation = z.object({
    firstName:z.string().optional(),
    middleName:z.string().optional(),
    lastName:z.string().optional()
})

const createFacultyValidation = z.object({
    body:z.object({
        faculty:z.object({
            name:facultyNameValidation,
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
const updateFacultyValidation = z.object({
    body:z.object({
        name:updateFacultyNameValidation.optional(),
        email:z.string().email({message:"Email is not valid"}).optional(),
        contactNumber:z.string().regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }).optional(),
        gender:z.enum(["Male","Female"]).optional(),
        presentAddress:z.string().optional(),
        permanetAddress:z.string().optional(),
        profile:z.string().optional()
    }),
})


export const FacultyValidations = {
    createFacultyValidation,
    updateFacultyValidation
}