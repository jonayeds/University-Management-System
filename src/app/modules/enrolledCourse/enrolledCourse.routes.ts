import express from "express"
import { requestValidator } from "../../middleware/validateRequest"
import { EnrolledCourseValidation } from "./enrolledCourse.validation"
import { EnrolledCourseControllers } from "./enrolledCourse.controller"

const router = express.Router()

router.post("/create-enrolled-course", requestValidator(EnrolledCourseValidation.createEnrolledCourseValidationSchema), EnrolledCourseControllers.createEnrolledCourse)

export const EnrolledCourseRoutes = router