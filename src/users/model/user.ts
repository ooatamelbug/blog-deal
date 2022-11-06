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

const User: Model<IUserModel> = mongoose.model<IUserModel>("user", UserSchema);


UserSchema.pre("save", async function (this: IUserModel, next) {
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});


export default User;
