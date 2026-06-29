// Botswana Agricultural Intelligence System - static host for Railway
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css",
  ".json":"application/json", ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml",
  ".ico":"image/x-icon", ".woff2":"font/woff2" };

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") { res.writeHead(200, {"Content-Type":"text/plain"}); return res.end("ok"); }
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
  const safe = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(ROOT, safe);
  fs.readFile(filePath, (err, data) => {
    if (err) { // single-page fallback
      return fs.readFile(path.join(ROOT, "index.html"), (e2, idx) => {
        if (e2) { res.writeHead(404); return res.end("Not found"); }
        res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"}); res.end(idx);
      });
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {"Content-Type": TYPES[ext] || "application/octet-stream"});
    res.end(data);
  });
});
server.listen(PORT, "0.0.0.0", () => console.log("Botswana AIS listening on " + PORT));
