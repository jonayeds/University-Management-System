import express from 'express';
import { studentControllers } from './student.controller';
export const StudentRoutes = express.Router();

// will call the controllers
StudentRoutes.get('/students', studentControllers.getAllStudents);
StudentRoutes.get('/student/:studentId', studentControllers.getASingleStudent);
StudentRoutes.delete("/:studentId",studentControllers.deleteAStudent)