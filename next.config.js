/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/inventario', destination: '/inventario.html' },
      { source: '/inventario-app', destination: '/inventario-app.html' },
    ];
  },
};

module.exports = nextConfig;
