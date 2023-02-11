const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector("#new-comment").value.trim();

  var getPostId = window.location.pathname.split("/");
  const post_id = getPostId[3];

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id,
      comment_body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    console.log("Comment was not posted");
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);
