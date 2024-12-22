import express from "express"
import { requestValidator } from "../../middleware/validateRequest"
import { AuthValidations } from "./auth.validation"
import { AuthController } from "./auth.controller"

const router = express.Router()

router.post("/login", requestValidator(AuthValidations.loginValidationSchema), AuthController.userLogin)

export const AuthRoutes = router