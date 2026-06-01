/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source', // This is similar to raw-loader in Webpack 5
    });
    return config;
  },
};


export default nextConfig;
