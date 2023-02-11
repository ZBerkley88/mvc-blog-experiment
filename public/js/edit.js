const editPostHander = async (event) => {
  event.preventDefault();

  const post_body = document.querySelector("#edited-post").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/update/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("Post was not updated");
  }
};

document
  .querySelector(".edit-form")
  .addEventListener("submit", editPostHander);
