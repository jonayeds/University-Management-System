import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const createOfferedCourseValidation = z.object({
    body:z.object({
        semesterRegistration:z.string(),
            academicFaculty:z.string(),
            academicDepartment:z.string(),
            course:z.string(),
            faculty:z.string(),
            maxCapacity:z.number(),
            section:z.number(),
            days:z.array(z.enum(Days as [string])),
            startTime:z.string().refine((time)=>{
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
                return regex.test(time)
            },{message:"Invalid time format"}),
            endTime:z.string().refine((time)=>{
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
                return regex.test(time)
            },{message:"Invalid time format"}),
    }).refine((time)=>{
        const startTimeDate = new Date(`1970-01-01T${time.startTime}:00`)
        const endTimeDate = new Date(`1970-01-01T${time.endTime}:00`)
        return endTimeDate>startTimeDate
    },{message:"end time must be after starting class"})
})
const updateOfferedCourseValidation = z.object({
    body:z.object({
        semesterRegistration:z.string().optional(),
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