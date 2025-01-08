import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { FacultyValidations } from './faculty.validation';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = Router();

router.get(
  '/',
  auth(User_role.admin, User_role.faculty, User_role.superAdmin),
  FacultyControllers.getAllFaculties,
);
router.get('/:facultyId',auth(User_role.admin, User_role.faculty, User_role.superAdmin), FacultyControllers.getASingleFaculty);
router.patch(
  '/:facultyId',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(FacultyValidations.updateFacultyValidation),
  FacultyControllers.updateFaculty,
);
router.delete('/:facultyId',auth(User_role.admin, User_role.superAdmin), FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
