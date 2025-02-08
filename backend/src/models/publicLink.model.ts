import mongoose, { Schema } from "mongoose";

const publicLinkSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const PublicLink = mongoose.model("PublicLink", publicLinkSchema);

export default PublicLink;