module.exports = {
  // Use root path for custom domain (larien.dev) or repository path for GitHub Pages
  publicPath:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_PUBLIC_PATH || "/" // Use custom domain root path by default
      : "/",

  // Optimize build for GitHub Pages
  outputDir: "dist",
  assetsDir: "assets",

  // Ensure source maps are generated for debugging
  productionSourceMap: false,

  // Configure webpack for better performance
  chainWebpack: (config) => {
    // Optimize chunk splitting for better caching
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    });
  },
};
