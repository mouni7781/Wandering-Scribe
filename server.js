import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Custom Route modules to maintain code cleanly
import { handleDeletePost } from "./routes/DELfunc.js";
import { handleGetPosts } from "./routes/GETfunc.js";
import { handleCreatePost } from "./routes/Postfunc.js";
import { handleUpdatePost } from "./routes/PUTFunc.js";
import { servePostHtml } from "./routes/REDIRECT.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    // Handle GET request for /api/posts
    if (req.url === "/api/posts" && req.method === "GET") {
      const data = await fs.readFile(path.join(`${__dirname}/data`, "posts.json"), "utf-8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
      return;
    }
    // to create new posts
    if(await handleCreatePost(req,res,__dirname)) return;

    // handle POST REAdme using get reques through route /api/posts/?id:number
    if (await handleGetPosts(req, res, __dirname)) return;    

    // redirect to post.html
    if (await servePostHtml(req, res, __dirname)) return;

    // to Update the posts
    if(await handleUpdatePost(req,res,__dirname))return;

    // to delete the posts
    if(await handleDeletePost(req,res,__dirname))return;

    // Main html file handling
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    const data = await fs.readFile(filePath);
    res.writeHead(200);
    res.end(data);

  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
})

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});