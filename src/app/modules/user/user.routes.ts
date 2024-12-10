import express from "express" 
import { UserControllers } from "./user.controller"

import { studentValidations } from "../student/student.validation"
import { requestValidator } from "../../middleware/validateRequest"
import { FacultyValidations } from "../faculty/faculty.validation"


const router = express.Router()


router.post("/create-student", requestValidator(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post("/create-faculty", requestValidator(FacultyValidations.createFacultyValidation), UserControllers.createFaculty)


export const UserRoutes = router
