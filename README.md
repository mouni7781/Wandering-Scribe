# 📝 Wandering Scribe  
### A Minimal Node.js Blog Platform — Built Without Express  

> A lightweight, fully functional blogging platform demonstrating **CRUD operations (Create, Read, Update, Delete)** using **pure Node.js** and **Vanilla JavaScript** — no external frameworks.  

---

## 🚀 Features

- 🧠 **Custom Routing with Native HTTP Module** – No Express or third-party servers  
- ✏️ **Create, Read, Update, Delete** posts directly from the frontend  
- 💾 **JSON-based storage** – no external database needed  
- ⚡ **Dynamic Frontend Rendering** using JavaScript and Fetch API  
- 🎨 **Tailwind CSS** styling for a clean, responsive layout  
- 🪶 **Modular server architecture** with separated route handlers  
- 🌐 **Seamless navigation** – “About Me” and content sections load dynamically without page reload  

---

## 🧩 Tech Stack

| Layer | Technology Used |
|-------|------------------|
| Backend | Node.js (HTTP, FS, Path modules) |
| Frontend | HTML5, Tailwind CSS, Vanilla JS |
| Storage | JSON Files (`posts.json`, `fullpost.json`) |
| Architecture | Modular Routes (`GET`, `POST`, `PUT`, `DELETE`, `REDIRECT`) |

---

## 📁 Folder Structure

```
project-root/
│
├── data/
│ ├── posts.json
│ └── fullpost.json
│
├── js/
│ ├── createpost.js
│ ├── deletepost.js
│ ├── readpost.js
│ ├── updatepost.js
│ ├── post.js
│ └── script.js
│
├── routes/
│ ├── GETfunc.js
│ ├── POSTfunc.js
│ ├── PUTFunc.js
│ ├── DELfunc.js
│ └── REDIRECT.js
│
├── index.html
├── post.html
└── server.js
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/wandering-scribe.git
   cd wandering-scribe
   ```
   
2. **Run the server**
   ```bash  
    node server.js
   ```

3. **Open in browser**
   ```bash
     http://localhost:3000
   ```
