import express from "express"
import { OfferedCourseControllers } from "./offeredCourse.controller"
import { requestValidator } from "../../middleware/validateRequest"
import { OfferdCourseValidation } from "./offeredCourse.validation"

const router = express.Router()

router.get("/", OfferedCourseControllers.getAllOfferedCourse)
router.post("/create-offered-course", requestValidator(OfferdCourseValidation.createOfferedCourseValidation), OfferedCourseControllers.createOfferedCourse)
router.get("/:id", OfferedCourseControllers.getASingleOfferedCourse)
router.patch("/:id", requestValidator(OfferdCourseValidation.updateOfferedCourseValidation), OfferedCourseControllers.updateOfferedCourse)
export const OfferedCourseRoutes = router