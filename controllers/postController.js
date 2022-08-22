const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1; 
  const older = Number(Number(page) + 1) ;                       // Başlangıç sayfamız veya ilk sayfamız.
  const postsPerPage = 3;                                 // Her sayfada bulunan fotoğraf sayısı
  const totalPosts = await Post.find().countDocuments(); // Toplam fotoğraf sayısı

  const posts = await Post.find({})                      // Fotoğrafları alıyoruz  
  .sort('-dateCreated')                                    // Fotoğrafları sıralıyoruz
  .skip((page-1) * postsPerPage)                          // Her sayfanın kendi fotoğrafları
  .limit(postsPerPage)                                    // Her sayfada olmasını istediğimi F. sayısını sınırlıyoruz.
  
  res.render('index', {
    posts: posts,
    current: page,
    older: older,
    pages: Math.ceil(totalPosts / postsPerPage),
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
