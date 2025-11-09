import fs from "fs/promises";
import path from "path";

export async function handleGetPosts(req, res, __dirname) {
    try {
        if ((req.url.startsWith("/api/posts/") || req.url.startsWith("/api/posts?")) && req.method === "GET") {
            // Handling id for both queru and requests
            let id;
            if (req.url.includes("?")) {
                const queryPart = req.url.split("?")[1];
                const params = new URLSearchParams(queryPart);
                id = params.get("id");
            } else {
                id = req.url.split('/').pop();
            }
            const fullrawdata = await fs.readFile(path.join(`${__dirname}/data`, "fullpost.json"), "utf-8")
            const fulldata = JSON.parse(fullrawdata)
            const post = fulldata.find(p => p.id === id)
            if (!post) {
                res.writeHead(404, "post not found");
                res.end(JSON.stringify({ message: "Post nooot found" }));
                return true;
            }
            // if post is found 
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(post));
            return true;
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
        return true;
    }
    return false;
}