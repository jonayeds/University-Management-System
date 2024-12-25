import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import { requestValidator } from '../../middleware/validateRequest';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import { auth } from '../../middleware/auth';
import { User_role } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(User_role.admin),
  requestValidator(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(User_role.admin),
  requestValidator(FacultyValidations.createFacultyValidation),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  requestValidator(AdminValidations.createAdminValidation),
  UserControllers.createAdmin,
);
router.post(
  '/me',
  auth(User_role.admin,User_role.faculty, User_role.student),
  UserControllers.getMe,
);

export const UserRoutes = router;
