import express from "express"
import { requestValidator } from "../../middleware/validateRequest"
import { AuthValidations } from "./auth.validation"
import { AuthController } from "./auth.controller"
import { auth } from "../../middleware/auth"
import { User_role } from "../user/user.constant"

const router = express.Router()

router.post("/login", requestValidator(AuthValidations.loginValidationSchema), AuthController.userLogin)
router.post("/change-password",auth(User_role.student, User_role.admin, User_role.faculty), requestValidator(AuthValidations.changePasswordValidationSchema),AuthController.changePassword  )
export const AuthRoutes = router