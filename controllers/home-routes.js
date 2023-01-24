const router = require("express").Router();
const { User, Post, Comment } = require("../models")

require("dotenv").config();

// homepage route
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_body',
      'created_at',
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['email']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['email']
        }
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// login page route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("login");
});

// signup page route
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("signup");
});



module.exports = router;
