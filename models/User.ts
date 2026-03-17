import mongoose, { Schema } from 'mongoose';

export type UserDoc = {
  name: string;
  email: string;
  passwordHash: string;
};

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 120 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const User =
  ((mongoose as any).models.User as any) || (mongoose as any).model('User', UserSchema);

