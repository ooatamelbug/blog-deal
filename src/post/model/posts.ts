import mongoose, { Model, Schema, Document } from "mongoose";

export interface IPostModel extends Document {
  title: string;
  body: string;
  status: string;
  createdby: typeof mongoose.Types.ObjectId;
}

const PostSchema: Schema = new mongoose.Schema<IPostModel>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["APPROVED", "REJECTED", "PENDING"],
  },
  createdby: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
}, { timestamps: true });

const Post: Model<IPostModel> = mongoose.model<IPostModel>("posts", PostSchema);

export default Post;
