// --- Functions to Populate the HTML ---
function populateFeaturedPost(post) {
    const img = document.getElementById('featured-image');
    if (img) {
        img.src = post.imageUrl;
        img.alt = post.title;
    }

    const titleLink = document.querySelector('#featured-title a');
    if (titleLink) {
        titleLink.textContent = post.title;
        titleLink.href = `/post.html?id=${post.id}`
    }

    const meta = document.getElementById('featured-meta');
    if (meta) {
        meta.innerHTML = `By <span class="font-medium">${post.author}</span> on <time datetime="${post.date}">${post.date}</time>`;
    }

    const excerpt = document.getElementById('featured-excerpt');
    if (excerpt) {
        excerpt.textContent = post.excerpt;
    }

    // Update CRUD links
    const postElement = document.getElementById('featured-post');
    if (postElement) {
        const readMore = postElement.querySelector('a.font-semibold');
        readMore.href = post.postUrl;

        const editIcon = postElement.querySelector('a[title="Edit Post"]');
        editIcon.href = `/posts/${post.id}/edit`;

        const deleteLink = postElement.querySelector('a.text-red-600');
        deleteLink.href = `/posts/${post.id}/delete`;
    }
}

function populateRecentPosts(posts) {
    const listContainer = document.getElementById('recent-posts-list');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // Clear it

    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden';

        article.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="sm:w-1/3 h-48 sm:h-auto object-cover bg-gray-200">
            <div class="p-6 flex flex-col justify-between">
                <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">                    
                        <a href="/post.html?id=${post.id}" class="hover:text-indigo-600">${post.title}</a>
                    </h4>
                    <p class="text-sm text-gray-500 mb-3">${post.date}</p>
                    <p class="text-gray-600 leading-relaxed text-sm">
                        ${post.excerpt}
                    </p>
                </div>
                <div class="flex items-center space-x-4 mt-4">
                    <a href="${post.postUrl}" class="readmore text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Read more </a>
                    <a href="/posts/${post.id}/edit" class="edit text-gray-400 hover:text-blue-600" title="Edit Post">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </a>
                    <a href="/posts/${post.id}/delete" class="delete text-red-600 hover:text-red-800 font-medium text-sm">Delete</a>
                </div>
            </div>
        `;
        listContainer.appendChild(article);
    });
}

function populateSidebar(data) {
    const aboutImg = document.getElementById('about-image');
    if (aboutImg) {
        aboutImg.src = data.imageUrl;
        aboutImg.alt = `Portrait of ${data.name}`;
    }

    const aboutName = document.getElementById('about-name');
    if (aboutName) aboutName.textContent = data.name;

    const aboutBio = document.getElementById('about-bio');
    if (aboutBio) aboutBio.textContent = data.bio;

    const categoryList = document.getElementById('categories-list');
    if (categoryList) {
        categoryList.innerHTML = ''; // Clear existing
        data.categories.forEach(cat => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${cat.url}" class="hover:text-indigo-600">${cat.name} (${cat.count})</a>`;
            categoryList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/api/posts')
        .then(res => res.json())
        .then(data => {
            const allPosts = data.posts;
            const featuredPost = allPosts[allPosts.length - 1];
            const recentPosts = allPosts.slice(0, -1);
            populateFeaturedPost(featuredPost);
            populateRecentPosts(recentPosts);
            populateSidebar(data.sidebar)


        })
        .catch(err => console.error('Error fetching posts:', err));

    const homeSection = document.getElementById("home-section");
    const aboutSection = document.getElementById("about-section");
    const navLinks = document.querySelectorAll(".nav-link");
    function toggleSection(target) {
        if (!homeSection || !aboutSection) return;

        if (target === "about") {
            homeSection.classList.add("hidden");
            aboutSection.classList.remove("hidden");
        } else {
            aboutSection.classList.add("hidden");
            homeSection.classList.remove("hidden");
        }
    }
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // remove active state
            navLinks.forEach(l => {
                l.classList.remove("border-indigo-500", "text-gray-900");
                l.classList.add("border-transparent", "text-gray-500");
            });

            // activate clicked link
            link.classList.add("border-indigo-500", "text-gray-900");
            link.classList.remove("text-gray-500");

            // check which section to show
            const page = link.getAttribute("data-page");

            if (page === "about.html") {
                toggleSection("about");
            } else if (page === "home.html") {
                toggleSection("home");
            }
        });
    });
});