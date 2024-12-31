import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = express.Router();

router.get('/', AcademicFacultyControllers.findAllAcademicFaculties);
router.get(
  '/:academicFacultyId',
  AcademicFacultyControllers.findASingleAcademicFaculty,
);
router.post(
  '/create-academic-faculty',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:academicFacultyId',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
