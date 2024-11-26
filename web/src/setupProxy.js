const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000', // Cambia esto por el puerto correspondiente
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Elimina /api de la URL en la solicitud
      },
    })
  );
};
