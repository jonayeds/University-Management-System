import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { requestValidator } from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/create-academic-semester',
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
