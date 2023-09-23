import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { UserModelInterface } from '../interfaces/user.interface';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    timestamps: true,
  }
);

//register method

userSchema.statics.register = async function (
  name,
  email,
  password,
  photoUrl,
  address,
  phoneNumber
): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('Must fill name, email, password and photoUrl');
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error('Email already exist');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'password must 8+ chars, contains uppercase , lowercase, number and special char'
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    photoUrl,
    address,
    phoneNumber,
  });

  return user;
};

//login method

userSchema.statics.login = async function (email, password): Promise<userType> {
  if (!email || !password) {
    throw new Error('Must fill email & password ');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect Email or password');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect Email or password');
  }

  return user;
};

const UserModel = model<userType, UserModelInterface>('User', userSchema);

export default UserModel;
