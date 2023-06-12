const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    user: String,
    userID: String,
    no_of_comments: Number,
    device: {
      type: String,
      enum: ["Laptop", "Tablet", "Mobile"],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("posts", postSchema);

module.exports = {
  PostModel,
};
