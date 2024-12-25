import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(academicSemesterName as [string, ...string[]], {
      message: '',
    }),
    year: z.string(),
    code: z.enum(academicSemesterCode as [string, ...string[]]),
    startMonth: z.enum(months as [string, ...string[]]),
    endMonth: z.enum(months as [string, ...string[]]),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(academicSemesterName as [string, ...string[]], { message: '' })
      .optional(),
    year: z.string().optional(),
    code: z.enum(academicSemesterCode as [string, ...string[]]).optional(),
    startMonth: z.enum(months as [string, ...string[]]).optional(),
    endMonth: z.enum(months as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
