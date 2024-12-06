import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";


const createStudent =catchAsync(async (req, res) => {
  const { student:studentData, password} = req.body;
      const result = await UserServices.crateStudentIntoDB(password, studentData);
      response(res, {
        success: true,
        message: 'Successfully created a student',
        data: result,
        statusCode: 200,
      });
  });


  export const UserControllers = {
    createStudent
  }