import { model, Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester:{
        type:Schema.Types.ObjectId,
        ref:"AcademicSemester",
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:SemesterRegistrationStatus,
        default:"UPCOMING"
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    minCredit:{
        type:Number,
        default:3
    },
    maxCredit:{
        type:Number,
        default:15
    }
  },
  { timestamps: true },
);





export const SemesterRegistration =model<ISemesterRegistration>("SemesterRegistration", semesterRegistrationSchema)