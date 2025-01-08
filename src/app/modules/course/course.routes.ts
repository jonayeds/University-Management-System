import { Router } from 'express';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = Router();

router.post(
  '/create-course',
  auth(User_role.admin,User_role.superAdmin),
  requestValidator(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(User_role.admin, User_role.faculty, User_role.student ,User_role.superAdmin),
  CourseControllers.getAllCourses,
);
router.get(
  '/:id',
  auth(User_role.admin, User_role.faculty, User_role.student ,User_role.superAdmin),
  CourseControllers.getASingleCourse,
);
router.patch(
  '/:id',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:id', auth(User_role.admin), CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(CourseValidations.FacultiesWithCoursesValidation),
  CourseControllers.assignFaculties,
);
router.get(
  '/:courseId/get-faculties',
  auth(User_role.admin, User_role.superAdmin, User_role.student, User_role.faculty),
  CourseControllers.getAssignedFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(User_role.admin, User_role.superAdmin),
  requestValidator(CourseValidations.FacultiesWithCoursesValidation),
  CourseControllers.removeFaculties,
);

export const CourseRoutes = router;
