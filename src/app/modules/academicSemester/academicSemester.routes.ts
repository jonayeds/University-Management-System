import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { requestValidator } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:semesterId', AcademicSemesterControllers.getAcademicSemesterById);
router.patch(
  '/:semesterId',
  requestValidator(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
export const AcademicSemesterRoutes = router;
