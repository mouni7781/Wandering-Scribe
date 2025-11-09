document.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".delete");
  if (!deleteBtn) return;
  e.preventDefault();

  // Extract ID from href like /posts/post-1/delete
  const href = deleteBtn.getAttribute("href");
  const match = href.match(/\/posts\/(post-\d+)\/delete/);
  if (!match) return;
  const postId = match[1];

  const confirmDelete = confirm(`Are you sure you want to delete ${postId}?`);
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post");

    const result = await res.json();
    alert(result.message || "Post deleted successfully!");

    // Reload the page or redirect home to show effect 
    window.location.href = "/index.html";
  } catch (err) {
    console.error("Error deleting post:", err);
    alert("Could not delete the post.");
  }
});
