const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { withAuth } = require("../../utils/auth");

// CREATE post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.session.user_id
    })
    res.json(newPost);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// GET post by ID
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['email']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['email']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Could not find a post with this ID' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET all posts
router.get("/", async (req, res) => {
  try {
    const result = await Post.findAll();
    const posts = result.map((post) => {
      return post.get({ plain: true });
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const result = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
