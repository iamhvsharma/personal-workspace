import mongoose, { Schema } from "mongoose";

const tagsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Tag = mongoose.model("Tag", tagsSchema);

export default Tag;
