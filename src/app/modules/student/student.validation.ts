import { z } from 'zod';

// Username Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required.' })
    .regex(/^[A-Z][a-z]+$/, { message: 'First name must start with an uppercase letter and the rest lowercase.' }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required.' })
    .regex(/^[a-zA-Z]+$/, { message: 'Last name must only contain alphabetic characters.' }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required.' })
    .regex(/^[A-Z][a-z]+$/, { message: 'First name must start with an uppercase letter and the rest lowercase.' })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required.' })
    .regex(/^[a-zA-Z]+$/, { message: 'Last name must only contain alphabetic characters.' })
    .optional(),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Father contact number must be a 10-digit number.' })
    .optional(),
  motherName: z.string().trim().optional(),
  motherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Mother contact number must be a 10-digit number.' })
    .optional(),
  motherOccupation: z.string().trim().optional(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  address: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Local guardian contact number must be a 10-digit number.' })
    .optional(),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password:z
    .string()
    .min(6, {message:"Password must be minium 6 characters"})
    .optional(),
    student: z.object({
  name: userNameValidationSchema,
  gender: z
    .enum(['Male', 'Female'], { errorMap: () => ({ message: 'Gender must be either "Male" or "Female".' }) }),
  dateOfBirth: z
    .string()
    .optional(),
  email: z
    .string()
    .trim()
    .email({ message: 'Email must be a valid email address.' }),
  contactNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }),
  emergencyContact: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Emergency contact number must be a 10-digit number.' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Present address is required.' }),
  permanentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Permanent address is required.' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z
    .string()
    .url({ message: 'Profile image must be a valid URL.' })
    .optional(),
  admissionSemester:z.string(),
  academicDepartment:z.string()
    })
  })
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
  name: updateUserNameValidationSchema.optional(),
  gender: z
    .enum(['Male', 'Female'], { errorMap: () => ({ message: 'Gender must be either "Male" or "Female".' }) }).optional(),
  dateOfBirth: z
    .string()
    .optional(),
  email: z
    .string()
    .trim()
    .email({ message: 'Email must be a valid email address.' }).optional(),
  contactNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Contact number must be a 10-digit number.' }).optional(),
  emergencyContact: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Emergency contact number must be a 10-digit number.' }).optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional().optional(),
  presentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Present address is required.' }).optional(),
  permanentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Permanent address is required.' }).optional(),
  guardian: guardianValidationSchema.optional(),
  localGuardian: localGuardianValidationSchema.optional(),
  profileImage: z
    .string()
    .url({ message: 'Profile image must be a valid URL.' })
    .optional(),
  admissionSemester:z.string().optional(),
  academicDepartment:z.string().optional()
    })
  })
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
