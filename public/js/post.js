const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_body = document.querySelector("#message").value.trim();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        post_body,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log("Post was not posted");
  }
};

document.querySelector(".post-form").addEventListener("submit", newPostHandler);
