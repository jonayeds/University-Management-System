import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";

export const router = Router()

const moduleRoutes = [
    {
        path:"/user",
        route:UserRoutes
    },
    {
        path:"/student",
        route:StudentRoutes
    },
    {
        path:"/academic-semester",
        route:AcademicSemesterRoutes
    },
    {
        path:"/academic-faculty",
        route:AcademicFacultyRoutes
    },
    {
        path:"/academic-department",
        route: AcademicDepartmentRoutes
    },
    {
        path:"/faculties",
        route: FacultyRoutes
    },
]
moduleRoutes.forEach(route=> router.use(route.path, route.route))
