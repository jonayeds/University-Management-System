import express from 'express';
import { studentControllers } from './student.controller';
export const StudentRoutes = express.Router();

// will call the controllers
StudentRoutes.get('/', studentControllers.getAllStudents);
StudentRoutes.get('/:studentId', studentControllers.getASingleStudent);
StudentRoutes.delete("/:studentId",studentControllers.deleteAStudent)