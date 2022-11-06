import mongoose, { Model, Schema } from 'mongoose';
import bcryptjs from "bcryptjs";

export interface UserModel {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
  },
});

const User: Model<UserModel> = mongoose.model<UserModel>("user", UserSchema);


UserSchema.pre("save", async function (this: UserModel, next) {
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

export default UserModel;
