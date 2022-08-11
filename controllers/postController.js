const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  res.redirect(`/post/${req.params.id}`);
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
