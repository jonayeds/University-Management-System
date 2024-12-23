import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import { requestValidator } from "../../middleware/validateRequest";
import { FacultyValidations } from "./faculty.validation";
import { auth } from "../../middleware/auth";
import { User_role } from "../user/user.constant";

const router = Router()

router.get("/",auth(User_role.admin), FacultyControllers.getAllFaculties)
router.get("/:facultyId", FacultyControllers.getASingleFaculty)
router.patch("/:facultyId",requestValidator(FacultyValidations.updateFacultyValidation), FacultyControllers.updateFaculty)
router.delete("/:facultyId", FacultyControllers.deleteFaculty)

export const FacultyRoutes = router