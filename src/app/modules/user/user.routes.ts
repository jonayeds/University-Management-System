import express from "express" 
import { UserControllers } from "./user.controller"

import { studentValidations } from "../student/student.validation"
import { requestValidator } from "../../middleware/validateRequest"


const router = express.Router()


router.post("/create-student", requestValidator(studentValidations.createStudentValidationSchema), UserControllers.createStudent)

export const UserRoutes = router
