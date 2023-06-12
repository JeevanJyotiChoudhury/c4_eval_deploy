const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

const blacklistSchema = mongoose.Schema(
  {
    token: String,
  },
  {
    versionKey: false,
  }
);

const BlackListTokenModel = mongoose.model("blacklistedtoken", blacklistSchema);

module.exports = {
  UserModel,
  BlackListTokenModel,
};
