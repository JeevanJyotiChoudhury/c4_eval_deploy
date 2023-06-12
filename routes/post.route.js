const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.use(auth);

//add a post
postRouter.post("/add", async (req, res) => {
  try {
    const note = new PostModel(req.body);
    await note.save();
    res.json({ msg: "New post has been added", post: req.body });
  } catch (err) {
    res.json({ error: err.message });
  }
});

//get the post
postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.send(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//update
postRouter.patch("/update/:postID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc == userIDinPostDoc) {
      //update
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.json({ msg: `${post.title} has been updated` });
    } else {
      res.json({ msg: "Not Authorized!!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

//delete
postRouter.delete("/delete/:postID", async (req, res) => {
  //userID in the user doc === userID in the note doc
  const userIDinUserDoc = req.body.userID;
  const { postID } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postID });
    const userIDinPostDoc = post.userID;
    if (userIDinUserDoc == userIDinPostDoc) {
      //delete
      await PostModel.findByIdAndDelete({ _id: postID }, req.body);
      res.json({ msg: `${post.title} has been deleted` });
    } else {
      res.json({ msg: "Not Authorized!!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = {
  postRouter,
};
