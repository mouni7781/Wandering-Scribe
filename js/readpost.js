function showPopup(postData) {
    const overlay = document.createElement('div');
    overlay.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const modal = document.createElement("div");
    modal.className =
    "bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[80vh]";

    modal.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${postData.title}</h2>
    <p class="text-gray-500 mb-4">By ${postData.author} on ${postData.date}</p>
    <p class="text-gray-700 leading-relaxed whitespace-pre-line">${postData.content}</p>
    <button class="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Close</button>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
   modal.querySelector("button").addEventListener("click", () => overlay.remove());
}
document.addEventListener('click', async (e) => {
    const readBtn = e.target.closest('.readmore');
    if (!readBtn) return;
    e.preventDefault();

    // getting post id from this
    const url = readBtn.getAttribute('href');
    console.log(url)
    const idMatch = url.match(/posts\/([\w-]+)/);
    if (!idMatch) return;
    const id=idMatch[1];
    // console.log(id)
    const res = await fetch(`/api/posts/${id}`);
    const postData=await res.json();
    showPopup(postData);
})
