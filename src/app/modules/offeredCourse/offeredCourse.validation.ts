import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringValidationSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  { message: 'Invalid time format' },
);

const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(Days as [string])),
      startTime: timeStringValidationSchema,
      endTime: timeStringValidationSchema,
    })
    .refine(
      (time) => {
        const startTimeDate = new Date(`1970-01-01T${time.startTime}:00`);
        const endTimeDate = new Date(`1970-01-01T${time.endTime}:00`);
        return endTimeDate > startTimeDate;
      },
      { message: 'end time must be after starting class' },
    ),
});
const updateOfferedCourseValidation = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(Days as [string])),
    startTime: timeStringValidationSchema,
    endTime: timeStringValidationSchema,
  }),
});

export const OfferdCourseValidation = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
