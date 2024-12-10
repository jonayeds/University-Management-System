import express from "express" 
import { UserControllers } from "./user.controller"

import { studentValidations } from "../student/student.validation"
import { requestValidator } from "../../middleware/validateRequest"
import { FacultyValidations } from "../faculty/faculty.validation"
import { AdminValidations } from "../admin/admin.validation"


const router = express.Router()


router.post("/create-student", requestValidator(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post("/create-faculty", requestValidator(FacultyValidations.createFacultyValidation), UserControllers.createFaculty)
router.post("/create-admin", requestValidator(AdminValidations.createAdminValidation), UserControllers.createAdmin)


export const UserRoutes = router
