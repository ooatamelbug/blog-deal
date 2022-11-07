import mongoose, { Model, Schema, Document } from "mongoose";

export interface ICommentModel extends Document {
  body: string;
  post: typeof mongoose.Types.ObjectId
  createdby: typeof mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new mongoose.Schema<ICommentModel>({
    body: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  createdby: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Comment: Model<ICommentModel> = mongoose.model<ICommentModel>("comments", CommentSchema);

export default Comment;
