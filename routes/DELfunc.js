import fs from "fs/promises";
import path from "path";
export async function handleDeletePost(req, res, __dirname) {
    if (req.method === "DELETE" && req.url.startsWith("/api/posts/")) {
        try {
            const id = req.url.split("/").pop();
            const postsPath = path.join(__dirname, "data", "posts.json");
            const postsRaw = await fs.readFile(postsPath, "utf-8");
            const postsData = JSON.parse(postsRaw);
            const beforeCount = postsData.posts.length;
            postsData.posts = postsData.posts.filter(p => p.id !== id);
            // the above code just filter all other post id except the id we want and then writes it into the file like freshone
            await fs.writeFile(postsPath, JSON.stringify(postsData, null, 2));

            const fullPath = path.join(__dirname, "data", "fullpost.json");
            const fullRaw = await fs.readFile(fullPath, "utf-8");
            const fullData = JSON.parse(fullRaw);
            const newFullData = fullData.filter(p => p.id !== id);
            // Same as above
            await fs.writeFile(fullPath, JSON.stringify(newFullData, null, 2));

            // Sending status code for succesfull completion
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Post ${id} deleted successfully!` }));
            return true;
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return true;
        }
    }
    return false;
}
