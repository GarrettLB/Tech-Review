const router = require('express').Router();
const { Post, User } = require('../models');

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
    
    const post = postData.get({ plain: true })

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
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
      id: req.session.user_id
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

router.get('/newpost', (req, res) => {

  res.render('newpost', {
    new: true
  });
});

module.exports = router;