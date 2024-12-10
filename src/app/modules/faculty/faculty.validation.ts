import { z } from "zod";

const facultyNameValidation = z.object({
    firstName:z.string(),
    middleName:z.string().optional(),
    lastName:z.string()
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


export const FacultyValidations = {
    createFacultyValidation
}