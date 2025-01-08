import express from 'express';
import { requestValidator } from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { User_role } from '../user/user.constant';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(
    SemesterRegistrationValidation.createSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get('/',auth(User_role.admin, User_role.faculty, User_role.student, User_role.superAdmin), SemesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:id',
  auth(User_role.admin, User_role.faculty, User_role.student, User_role.superAdmin),
  SemesterRegistrationControllers.getASingleSemesterRegistration,
);
router.patch(
  '/:id',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(
    SemesterRegistrationValidation.updateSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
router.delete(
  '/:id',
  auth(User_role.admin, User_role.superAdmin),
  SemesterRegistrationControllers.deleteSemesterRegistration,
);
export const SemesterRegistrationRoutes = router;
