import express from 'express';
import { studentControllers } from './student.controller';
import { requestValidator } from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';
export const StudentRoutes = express.Router();

// will call the controllers
StudentRoutes.get('/', studentControllers.getAllStudents);
StudentRoutes.get('/:studentId', studentControllers.getASingleStudent);
StudentRoutes.delete("/:studentId",studentControllers.deleteAStudent)
StudentRoutes.patch("/:studentId",requestValidator(studentValidations.updateStudentValidationSchema),studentControllers.updateStudent)
