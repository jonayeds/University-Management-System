import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import { response } from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.createAcademicDepartment(
      req.body,
    );
    response(res, {
      success: true,
      message: 'Successfully added Academic Department',
      data: result,
      statusCode: 200,
    });
  },
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartments();
    response(res, {
      success: true,
      message: 'Successfully fetched all academis departments',
      data: result,
      statusCode: 200,
    });
  },
);
const getASingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { academicDepartmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getASingleAcademicDepartment(
        academicDepartmentId,
      );
    response(res, {
      success: true,
      message: 'Successfully added Academic Department',
      data: result,
      statusCode: 200,
    });
  },
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { academicDepartmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartment(
      academicDepartmentId,
      req.body,
    );
    response(res, {
      success: true,
      message: 'Successfully updated Academic Department',
      data: result,
      statusCode: 200,
    });
  },
);

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getASingleAcademicDepartment,
  updateAcademicDepartment,
};
