import express from 'express';
import { studentControllers } from './student.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';
export const StudentRoutes = express.Router();

// will call the controllers
StudentRoutes.get('/',auth(User_role.admin), studentControllers.getAllStudents);
StudentRoutes.get('/:studentId', studentControllers.getASingleStudent);
StudentRoutes.delete("/:studentId",studentControllers.deleteAStudent)
StudentRoutes.patch("/:studentId",requestValidator(studentValidations.updateStudentValidationSchema),studentControllers.updateStudent)
