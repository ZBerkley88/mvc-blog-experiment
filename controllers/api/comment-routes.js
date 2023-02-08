const router = require("express").Router();
const { Comment } = require("../../models");
const { withAuth } = require("../../utils/auth");

// CREATE comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
    res.json(newComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
})


// PUT comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const result = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const result = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
