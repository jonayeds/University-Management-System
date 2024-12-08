import express from "express"
import { AcademicDepartmentControllers } from "./academicDepartment.controller"
import { requestValidator } from "../../middleware/validateRequest"
import { AcademicDepartmentValidations } from "./academicDepartment.validation"

const router= express.Router()

router.post('/create-academic-department',
    requestValidator(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema),
     AcademicDepartmentControllers.createAcademicDepartment)

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment)
router.get("/:academicDepartmentId", AcademicDepartmentControllers.getASingleAcademicDepartment)
router.patch("/:academicDepartmentId", requestValidator(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)

export const AcademicDepartmentRoutes = router