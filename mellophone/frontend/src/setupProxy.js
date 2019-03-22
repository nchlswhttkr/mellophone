const proxy = require("http-proxy-middleware");

/**
 * To get backend requests proxied (avoiding CSRF issues), we can configure CRA
 *
 * See https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
 */

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:8000" }));
};
