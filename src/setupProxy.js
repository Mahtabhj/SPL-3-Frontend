const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://54.173.112.117:8000/",
      changeOrigin: true,
    })
  );
};
