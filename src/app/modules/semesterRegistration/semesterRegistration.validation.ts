import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationValidation = z.object({
    body:z.object({
        academicSemester:z.string(),
            status:z.enum(SemesterRegistrationStatus as [string]),
            startDate:z.string().datetime(),
            endDate:z.string().datetime(),
            minCredit:z.number(),
            maxCredit:z.number()
    })
})

export const SemesterRegistrationValidation = {
    createSemesterRegistrationValidation,
}