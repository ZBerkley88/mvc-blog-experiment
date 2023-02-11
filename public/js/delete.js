const deletePostHander = async (event) => {
  event.preventDefault();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/delete/${post_id}`, {
    method: "DELETE",
    body: JSON.stringify({
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("Post was not deleted");
  }
};

document
  .querySelector(".deleteBtn")
  .addEventListener("click", deletePostHander);
