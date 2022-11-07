import mongoose, { Model, Schema, Document } from "mongoose";

export interface IInteractionModel extends Document {
  type: string;
  comment: typeof mongoose.Types.ObjectId
  post: typeof mongoose.Types.ObjectId
  createdby: typeof mongoose.Types.ObjectId;
}

const InteractionSchema: Schema = new mongoose.Schema<IInteractionModel>({
  type: {
    type: String,
    required: true,
    enum: ["LIKE", "ANGRY", "SAD", "DISLIKE"],
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
  },
  comment: {
    type: mongoose.Types.ObjectId,
    ref: "comments",
  },
  createdby: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Interaction: Model<IInteractionModel> = mongoose.model<IInteractionModel>("interactions", InteractionSchema);

export default Interaction;
