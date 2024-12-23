import { Router } from "express";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
import { requestValidator } from "../../middleware/validateRequest";

const router = Router()

router.post("/create-course", requestValidator(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)
router.get("/", CourseControllers.getAllCourses)
router.get("/:id", CourseControllers.getASingleCourse)
router.patch("/:id",requestValidator(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)
router.delete("/:id", CourseControllers.deleteCourse)

router.put("/:courseId/assign-faculties",requestValidator(CourseValidations.FacultiesWithCoursesValidation),CourseControllers.assignFaculties )
router.delete("/:courseId/remove-faculties",requestValidator(CourseValidations.FacultiesWithCoursesValidation),CourseControllers.removeFaculties )

export const CourseRoutes = router