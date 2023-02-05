const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { withAuth } = require("../utils/auth");

// GET all posts on the homepage
router.get("/", withAuth, (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
  }

  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_body", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_body", "user_id", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["email"],
        },
      },
      {
        model: User,
        attributes: ["email"],
      },
    ],
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
