import express from "express"
import { requestValidator } from "../../middleware/validateRequest"
import { EnrolledCourseValidation } from "./enrolledCourse.validation"
import { EnrolledCourseControllers } from "./enrolledCourse.controller"
import { auth } from "../../middleware/auth"
import { User_role } from "../user/user.constant"

const router = express.Router()

router.post("/create-enrolled-course",auth(User_role.student), requestValidator(EnrolledCourseValidation.createEnrolledCourseValidationSchema), EnrolledCourseControllers.createEnrolledCourse)

export const EnrolledCourseRoutes = router