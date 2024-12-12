import { Router } from "express";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
import { requestValidator } from "../../middleware/validateRequest";

const router = Router()

router.post("/create-course", requestValidator(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)
router.get("/", CourseControllers.getAllCourses)
router.get("/:id", CourseControllers.getASingleCourse)
router.delete("/:id", CourseControllers.deleteCourse)

export const CourseRoutes = router