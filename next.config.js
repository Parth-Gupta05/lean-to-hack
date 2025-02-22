module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { process: false };
    return config;
  },
};
