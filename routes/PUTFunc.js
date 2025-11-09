import fs from "fs/promises";
import path from "path";
export async function handleUpdatePost(req, res, __dirname) {
    if (req.method === "PUT" && req.url.startsWith("/api/posts/")) {
        const id = req.url.split("/").pop();
        let body = "";
        // Same as Create Function route
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const updated = JSON.parse(body);
                // Updating Fullpost.json
                const fullPath = path.join(__dirname, "data", "fullpost.json");
                const fullRaw = await fs.readFile(fullPath, "utf-8");
                const fullData = JSON.parse(fullRaw);
                const index = fullData.findIndex(p => p.id === id);

                fullData[index] = { ...fullData[index], ...updated };
                await fs.writeFile(fullPath, JSON.stringify(fullData, null, 2));
                // Updating posts.json
                const postsPath = path.join(__dirname, "data", "posts.json");
                const postsRaw = await fs.readFile(postsPath, "utf-8");
                const postsData = JSON.parse(postsRaw);
                const summaryIndex = postsData.posts.findIndex(p => p.id === id);
                if (summaryIndex !== -1) {
                    postsData.posts[summaryIndex] = {
                        ...postsData.posts[summaryIndex],
                        title: updated.title,
                        author: updated.author,
                        imageUrl: updated.imageUrl,
                        excerpt: updated.excerpt || updated.content.slice(0, 120) + "...",
                        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                    };
                    await fs.writeFile(postsPath, JSON.stringify(postsData, null, 2));
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: `Post ${id} updated successfully!` }));

            } catch {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Internal Server Error" }));
            }
        })
    }
    return false
}