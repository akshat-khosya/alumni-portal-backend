const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      default:""
    },
    media: {
      type: String,
      default:null
    },
    likes: [String],
    comments: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
