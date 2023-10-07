export default [
  {
    context: ["/"],
    target: "http://localhost:8081",
    "secure": false,
    "bypass": function (req, res, proxyOptions) {
      if (req.url.startsWith("/home") && req.method === "GET") {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
      }
      // req.headers['X-Custom-Header'] = 'yes';
    }
  }
]
