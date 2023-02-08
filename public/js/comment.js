const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector("#your-comment").value.trim();
  console.log("comment_body", comment_body);

  var getPostId = window.location.pathname.split("/");
  const post_id = getPostId[3];
  console.log(post_id)

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id,
      comment_body,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("comment response", response);

  if (response.ok) {
    document.location.reload();
  } else {
    console.log("Comment was not posted");
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);
