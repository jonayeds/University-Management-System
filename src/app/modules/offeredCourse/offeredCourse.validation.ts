import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const createOfferedCourseValidation = z.object({
    body:z.object({
        semsesterRegistration:z.string(),
            academicSemester:z.string(),
            academicfaculty:z.string(),
            academicDepartment:z.string(),
            course:z.string(),
            faculty:z.string(),
            maxCapacity:z.number(),
            section:z.number(),
            days:z.enum(Days as [string]),
            startTime:z.string(),
            endTime:z.string()
    })
})
const updateOfferedCourseValidation = z.object({
    body:z.object({
        semsesterRegistration:z.string().optional(),
            faculty:z.string().optional(),
            maxCapacity:z.number().optional(),
            section:z.number().optional(),
            days:z.enum(Days as [string]).optional(),
            startTime:z.string().optional(),
            endTime:z.string().optional()
    })
})

export const OfferdCourseValidation = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation
}