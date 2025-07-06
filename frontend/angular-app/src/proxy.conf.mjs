export default [
  {
    context: ["/"],
    target: "http://localhost:8080",
    "secure": false,
    "bypass": function (req, res, proxyOptions) {
      if ((req.url.startsWith("/home") || req.url.startsWith("/login") || req.url.startsWith("/admin")) && req.method === "GET") {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
      }
      // req.headers['X-Custom-Header'] = 'yes';
    }
  }
]
