const router = require("express").Router();
const { Post } = require("../../models");
const { withAuth } = require("../../utils/auth");

// Post a message
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (err) {
    res.json(err);
  }
});

// Get Post by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await Post.findByPk(req.params.id);
    if (result) {
      const post = result.get({ plain: true });
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Posts
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

// Update post
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

// Delete a post
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
