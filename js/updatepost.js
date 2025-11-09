function showEditPopup(post) {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className =
    "bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]";
  const placeholders = {
    title: "Enter post title",
    author: "Enter author name",
    imageUrl: "Enter image URL (optional)",
    excerpt: "Write a short excerpt or summary...",
    content: "Write full content for this post..."
  };
  modal.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Edit Post</h2>
    <form id="edit-post-form" class="space-y-4">
      <input type="text" name="title" value="${post.title || ""}" placeholder="${placeholders.title}" " required class="w-full border p-2 rounded" />
      <input type="text" name="author" value="${post.author}${post.author || ""}" 
        placeholder="${placeholders.author}" required class="w-full border p-2 rounded" />
      <input type="text" name="imageUrl" value="${post.imageUrl || ""}" 
        placeholder="${placeholders.imageUrl}" class="w-full border p-2 rounded" />
      <textarea name="excerpt" rows="3" placeholder="${placeholders.excerpt}" class="w-full border p-2 rounded">${post.excerpt || ""}</textarea>
      <textarea name="content" rows="5" placeholder="${placeholders.content}"  class="w-full border p-2 rounded">${post.content || ""}</textarea>
      <div class="flex justify-end space-x-3">
        <button type="button" class="cancel bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" class="save bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save</button>
      </div>
    </form>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  modal.querySelector(".cancel").addEventListener("click", () => overlay.remove());

  const form = modal.querySelector("#edit-post-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const updated = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update post");

      alert("Post updated successfully!");
      overlay.remove();
      location.reload();
    } catch (err) {
      console.error("Update error:", err);
      alert("Could not update post.");
    }
  });
}

document.addEventListener("click", async (e) => {
  const editBtn = e.target.closest(".edit");
  if (!editBtn) return;
  e.preventDefault();

  const href = editBtn.getAttribute("href");
  const match = href.match(/\/posts\/(post-\d+)\/edit/);
  if (!match) return;
  const postId = match[1];

  try {
    const res = await fetch(`/api/posts/${postId}`);

    if (!res.ok) throw new Error("Post not found");
    const post = await res.json();
    showEditPopup(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    alert("Could not load post for editing.");
  }
});

