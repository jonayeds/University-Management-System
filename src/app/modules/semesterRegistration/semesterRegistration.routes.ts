import express from "express"
import { requestValidator } from "../../middleware/validateRequest"
import { SemesterRegistrationValidation } from "./semesterRegistration.validation"
import { SemesterRegistrationControllers } from "./semesterRegistration.controller"

const router = express.Router()

router.post("/create-semester-registration", requestValidator(SemesterRegistrationValidation.createSemesterRegistrationValidation), SemesterRegistrationControllers.createSemesterRegistration)
router.get("/",SemesterRegistrationControllers.getAllSemesterRegistration)
router.get("/:id",SemesterRegistrationControllers.getASingleSemesterRegistration)
router.patch("/:id",requestValidator(SemesterRegistrationValidation.updateSemesterRegistrationValidation), SemesterRegistrationControllers.updateSemesterRegistration)
router.delete("/:id", SemesterRegistrationControllers.deleteSemesterRegistration)
export const SemesterRegistrationRoutes = router