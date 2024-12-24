import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be 6 characters long at least'],
      select:0
    },
    passwordChangedAt:{
      type:Date
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
      default: 'inProgress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// pre save middeware
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

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function(passwordChangedAt:Date, jwtIssuedTimeStamp:number){
  const passwordChangeTime  = new Date(passwordChangedAt).getTime() / 1000
  return passwordChangeTime>jwtIssuedTimeStamp
}

export const User = model<IUser, IUserModel>('User', userSchema);
