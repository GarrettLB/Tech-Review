const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
        model: User,
        attributes: ['username'] 
        },
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));
    
    res.render('titles', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { 
        model: User,
        attributes: ['username']  
        },
      ]
    });
  
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        { 
        model: User,
        attributes: ['username']  
        },
      ]
    })
    
    const post = postData.get({ plain: true })
    const comments = commentData.map(comment => comment.get({ plain: true }));

    console.log(post)
    console.log(comments)

    res.render('post', {
      post,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/yourposts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { 
        model: User,
        attributes: ['username']  
        },
      ]
    });
  
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    
    const post = postData.get({ plain: true })

    res.render('newpost', {
      post,
      logged_in: req.session.logged_in,
      exist: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {
    const postData = await Post.findAll({
      where: {
      user_id: req.session.user_id
      },
      include: [{ model: User }]
    });
  
    const posts = postData.map(post => post.get({ plain: true }));
  
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {

  res.render('signup');
});

router.get('/newpost', (req, res) => {

  res.render('newpost', {
    new: true,
    logged_in: req.session.logged_in,
  });
});

router.get('/newcomment/:id', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('newcomment');
});

module.exports = router;