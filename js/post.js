function populatePost(post) {
  const image = document.getElementById("post-image");
  const title = document.getElementById("post-title");
  const meta = document.getElementById("post-meta");
  const content = document.getElementById("post-content");

  image.src = post.imageUrl || "https://placehold.co/600x400";
  title.textContent = post.title || "Untitled Post";
  meta.textContent = `By ${post.author || "Unknown"} on ${post.date || "Unknown date"}`;
  content.textContent = post.content || "No content available.";
}

// --- Helper function: Populate sidebar posts ---
function populateSidebar(recentPosts, currentId) {
  const sidebarList = document.getElementById("other-posts");
  sidebarList.innerHTML = "";

  recentPosts
    .filter(p => p.id !== currentId)
    .forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="/post.html?id=${p.id}" class="text-indigo-600 hover:text-indigo-800">${p.title}</a>`;
      sidebarList.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    document.body.innerHTML = "<h1 class='text-center text-red-500 mt-20'>Invalid post ID</h1>";
    return;
  }

  try {
    const res = await fetch(`/api/posts/${postId}`);
    if (!res.ok) throw new Error(`Post ${postId} not found`);
    const post = await res.json();
    populatePost(post);

    const sidebarRes = await fetch("/api/posts");
    if (!sidebarRes.ok) throw new Error("Failed to fetch sidebar posts");
    const allPosts = await sidebarRes.json();
    const recent = allPosts.posts || [];
    populateSidebar(recent, postId);

  } catch (err) {
    console.error("Error loading post:", err);
    document.body.innerHTML = `
      <div class="text-center text-red-500 mt-20">
        <h1>post Not found</h1>
        <p>${err.message}</p>
      </div>`;
  }  
})