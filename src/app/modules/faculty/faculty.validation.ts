import { z } from "zod";

const facultyNameValidation = z.object({
    firstName:z.string(),
    middleName:z.string().optional(),
    lastName:z.string()
})

const createFacultyValidation = z.object({
    body:z.object({
        name:facultyNameValidation,
        email:z.string().email({message:"Email is not valid"}).optional(),
        contactNo:z.string().regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }),
        gender:z.enum(["Male","Female"]),
        address:z.string().optional(),
        academicDepartment:z.string()
    })
})


export const FacultyValidations = {
    createFacultyValidation
}