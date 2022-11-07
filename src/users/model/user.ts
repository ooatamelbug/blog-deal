import mongoose, { Model, Schema, Document } from 'mongoose';
import bcryptjs from "bcryptjs";

export interface IUserModel extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new mongoose.Schema<IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
  },
});



UserSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

const User: Model<IUserModel> = mongoose.model<IUserModel>("user", UserSchema);

export default User;
