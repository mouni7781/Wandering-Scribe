import fs from "fs/promises";
import path from "path";

export async function handleCreatePost(req, res, __dirname) {

    if (req.url === "/api/posts" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const newPost = JSON.parse(body);
                const summaryPost = {
                    id: newPost.id,
                    title: newPost.title,
                    author: newPost.author,
                    date: newPost.date,
                    excerpt: newPost.excerpt || newPost.content.slice(0, 120) + "...",
                    imageUrl: newPost.imageUrl,
                    postUrl: `/posts/${newPost.id}`
                };

                // update post.json
                const postsPath = path.join(__dirname, "data", "posts.json");
                const postsRaw = await fs.readFile(postsPath, "utf-8");
                const postsData = JSON.parse(postsRaw);
                postsData.posts.push(summaryPost);
                await fs.writeFile(postsPath, JSON.stringify(postsData, null, 2));

                // update fullpost.json
                const fullPath = path.join(__dirname, "data", "fullpost.json");
                const fullRaw = await fs.readFile(fullPath, "utf-8");
                const fullData = JSON.parse(fullRaw);
                fullData.push(newPost);
                await fs.writeFile(fullPath, JSON.stringify(fullData, null, 2));

                // return status code for succesful completions
                res.writeHead(201,{ "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: "Post created", post: newPost }));
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Internal Server Error" }));
            }
        })
        return true;
    }
    return false
}