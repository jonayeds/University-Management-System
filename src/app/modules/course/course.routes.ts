import { Router } from 'express';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = Router();

router.post(
  '/create-course',
  auth(User_role.admin),
  requestValidator(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(User_role.admin, User_role.faculty, User_role.student),
  CourseControllers.getAllCourses,
);
router.get(
  '/:id',
  auth(User_role.admin, User_role.faculty, User_role.student),
  CourseControllers.getASingleCourse,
);
router.patch(
  '/:id',
  auth(User_role.admin),
  requestValidator(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:id', auth(User_role.admin), CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  requestValidator(CourseValidations.FacultiesWithCoursesValidation),
  CourseControllers.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  requestValidator(CourseValidations.FacultiesWithCoursesValidation),
  CourseControllers.removeFaculties,
);

export const CourseRoutes = router;
