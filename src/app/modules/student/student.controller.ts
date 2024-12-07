
import { studentServices } from './student.service';
import { response } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';






const getAllStudents = catchAsync(async (req, res) => {
    const result = await studentServices.getAllStudents();
    response(res, {
      success: true,
      message: 'Successfully fetched all student data',
      data: result,
      statusCode: 200,
    });
});
const getASingleStudent =catchAsync(async (req, res) => {
    const id = req.params.studentId;
    const result = await studentServices.getASingleStudent(id);
    response(res, {
      success: true,
      message: 'Successfully fetched single student data',
      data: result,
      statusCode: 200,
    });
});
const deleteAStudent =catchAsync(async (req, res) => {
    const studentId = req.params.studentId;
    const result = await studentServices.deleteStudentFromDB(studentId);
    response(res, {
      success: true,
      message: 'Successfully deleted student from database',
      data: result,
      statusCode: 200,
    });
});

const updateStudent = catchAsync(async (req,res)=>{
  const {studentId} = req.params
  const result = await studentServices.updateStudentIntoDB(studentId,req.body.student);
  response(res, {
    statusCode:200,
    success:true,
    message:"Successfully updated Student",
    data:result
  })
})

export const studentControllers = {
  getAllStudents,
  getASingleStudent,
  deleteAStudent,
  updateStudent
};
