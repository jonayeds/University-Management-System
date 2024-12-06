import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be 6 characters long at least'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['inProgress', 'blocked'],
      default:"inProgress"
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);


// pre save middleware
userSchema.pre('save', async function (next) {
  // Hashing password and save into DB
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

// post save middleware 
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const User =model<IUser>("User", userSchema)