const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://zsrx3fh6od.execute-api.us-east-2.amazonaws.com",
      changeOrigin: true,
    })
  );
};
