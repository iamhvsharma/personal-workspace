import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    enum: ["Thread", "Article", "Youtube", "Other"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Content = mongoose.model("Content", contentSchema);

export default Content;
