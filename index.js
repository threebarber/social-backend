const express = require("express");
const mongoose = require("mongoose");
const Filter = require("bad-words");

/* schemas */
const User = require("./schemas/User");
const Comment = require("./schemas/Comment");
const Post = require("./schemas/Post");

require("dotenv").config();

const app = express();
const filter = new Filter();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("---");
  next();
};

app.use(requestLogger);

app.use(express.json());

/* add post */

app.post("/api/posts", async (req, res) => {
  try {
    const title = req.body.postTitle;
    const content = req.body.postContent;
    const user = req.body.userId;

    const newPost = new Post({
      postTitle: title,
      postContent: content,
      userId: user,
    });

    newPost.save().then(res.json(newPost));
  } catch (err) {
    res.json({ error: err.message });
  }
});

/* all posts */
app.get("/api/posts", async (req, res) => {
  Post.find({}).then((posts) => {
    res.json(posts);
  });
});

/*specific post */
app.get("/api/posts/:postId", async (req, res) => {
  Post.findById(req.params.postId).then((post) => {
    res.json(post);
  });
});

/* add user */

app.post("/api/users", async (req, res) => {
  try {
    const username = req.body.userName;
    const userId = req.body.userId;

    const newUser = new User({
      userId,
      userName: username,
    });

    newUser.save().then(res.json(newUser));
  } catch (err) {
    res.json({ error: err.message });
  }
});

/* get user info */

app.get("/api/users/:userId", async (req, res) => {
  try {
    User.findOne({userId: req.params.userId}).then((user) => {
      /*res.json(user || {success: false});*/
      if(user){
        res.json({user: user, "exists" : true})
      }else{
        res.json({"exists": false})
      }
    });
  } catch (error) {
    res.json({"error":"user does not exist"})
  }
});

console.log("connecting to", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
