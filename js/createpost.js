function showCreatePopup() {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className =
    "bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]";

  modal.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Create New Post</h2>
    <form id="create-post-form" class="space-y-4">
      <input type="text" name="title" placeholder="Title" required class="w-full border p-2 rounded" />
      <input type="text" name="author" placeholder="Author" required class="w-full border p-2 rounded" />
      <input type="text" name="imageUrl" placeholder="Image URL" class="w-full border p-2 rounded" />
      <textarea name="excerpt" placeholder="Excerpt" rows="3" class="w-full border p-2 rounded"></textarea>
      <textarea name="content" placeholder="Full Content" rows="5" class="w-full border p-2 rounded"></textarea>

      <div class="flex justify-end space-x-3">
        <button type="button" class="cancel-btn bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" class="submit-btn bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Create</button>
      </div>
    </form>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  modal.querySelector(".cancel-btn").addEventListener("click", () => overlay.remove());

  // handle form submission
  const form = modal.querySelector("#create-post-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());
    formData.id = await getnextid() // unique id for now
    
    formData.date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to create post");

      alert("Post created successfully! yeahh 😀");
      overlay.remove();
      location.reload(); // reload to refresh UI
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.Pls without hesitating Try again and test Your Luck \u{1F622}");
    }
  });
}

async function getnextid(){
  const res = await fetch("/api/posts");
  const data = await res.json();
  const posts = data.posts || [];
  if (posts.length === 0) return "post-1";

  const lastPost = posts[posts.length - 1];
  const lastId = lastPost.id || "post-0";
  const num = parseInt(lastId.replace("post-", "")) || 0;
  const nextNum = num + 1;
  return `post-${nextNum}`;
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".create-post-btn");
  if (!btn) return;
  e.preventDefault();

  showCreatePopup();
});