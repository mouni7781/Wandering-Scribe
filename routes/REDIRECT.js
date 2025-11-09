import fs from "fs/promises";
import path from "path";
export async function servePostHtml(req, res, __dirname) {
    if (req.url.startsWith("/post.html")) {
        const filePath = path.join(__dirname, "post.html");
        const data = await fs.readFile(filePath);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        return true;
    }
    return false;
}