import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(User_role.admin,User_role.superAdmin),
  requestValidator(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get(
  '/:academicDepartmentId',
  AcademicDepartmentControllers.getASingleAcademicDepartment,
);
router.patch(
  '/:academicDepartmentId',
  auth(User_role.admin,User_role.superAdmin),
  requestValidator(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
