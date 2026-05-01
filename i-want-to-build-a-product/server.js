const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = process.env.PORT || 4173;
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".md": "text/markdown",
  ".sql": "text/plain"
};

http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://${host}:${port}`);
    let file = decodeURIComponent(url.pathname);
    if (file === "/") file = "/index.html";

    const fullPath = path.normalize(path.join(root, file));
    if (!fullPath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(fullPath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(fullPath)] || "application/octet-stream"
      });
      response.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`What's the Vibe Tonight is running at http://${host}:${port}`);
  });
