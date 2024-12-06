import express from "express"
import { AcademicFacultyControllers } from "./academicFaculty.controller"
import { requestValidator } from "../../middleware/validateRequest"
import { AcademicFacultyValidation } from "./academicFaculty.validation"

const router = express.Router()

router.get("/",AcademicFacultyControllers.findAllAcademicFaculties)
router.get("/:academicFacultyId",AcademicFacultyControllers.findASingleAcademicFaculty)
router.post("/create-academic-faculty", requestValidator(AcademicFacultyValidation.createAcademicFacultyValidationSchema) ,AcademicFacultyControllers.createAcademicFaculty)
router.patch("/:academicFacultyId", requestValidator(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const AcademicFacultyRoutes = router