# 🚀 Deployment Guide - GitHub Pages

This guide covers how to deploy your Vue.js Travel Map to GitHub Pages with custom domain support.

## ⚡ Quick Deployment (Recommended)

### One-Command Deployment

```bash
npm run deploy
```

This single command will:
- ✅ Clean previous builds
- ✅ Build the Vue.js project
- ✅ Copy CNAME file for custom domain
- ✅ Create .nojekyll file for GitHub Pages
- ✅ Deploy to gh-pages branch

### Alternative Commands

```bash
# Quick build and deploy (without cleanup)
npm run deploy:quick

# Just build the project
npm run build

# Preview build locally before deploying
npm run preview

# Clean build directory
npm run clean
```

## 🌐 Domain Configuration

### Custom Domain (Current Setup)
Your app is configured for: **larien.dev**

The deployment script automatically:
- Copies the `CNAME` file to the build directory
- Sets up GitHub Pages custom domain
- Uses root path configuration

### GitHub Pages Default Domain
If you want to use the default GitHub Pages domain instead:

1. Remove or rename the `CNAME` file
2. Update `vue.config.js` to set the correct path:
   ```bash
   export VUE_APP_PUBLIC_PATH="/your-repo-name/"
   npm run deploy
   ```

## 📋 Manual Deployment Steps

If you prefer to deploy manually:

```bash
# 1. Build the project
npm run build

# 2. Copy CNAME file
cp ../CNAME dist/

# 3. Create .nojekyll file
touch dist/.nojekyll

# 4. Deploy to GitHub Pages
npx gh-pages -d dist
```

## 🤖 Automatic Deployment (GitHub Actions)

### Setup Automatic Deployment

1. Go to your GitHub repository
2. Navigate to **Settings** > **Pages**
3. Set source to **Deploy from a branch**
4. Select **gh-pages** branch

### Push to Deploy
Once set up, every push to `main` branch will automatically:
- Build your project
- Deploy to GitHub Pages
- Update your live site

## 🔧 Configuration Details

### Vue Configuration (`vue.config.js`)
```javascript
module.exports = {
  // Custom domain uses root path '/'
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  
  // Optimized for production
  productionSourceMap: false,
  
  // Better caching with chunk splitting
  chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    })
  }
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "deploy": "node scripts/deploy.js",
    "deploy:quick": "npm run build && npm run deploy:gh-pages",
    "preview": "npm run build && npx serve dist",
    "clean": "rm -rf dist"
  }
}
```

## 🏗️ Build Process

The deployment script performs these steps:

1. **Clean**: Removes previous `dist` folder
2. **Build**: Runs `vue-cli-service build`
3. **CNAME**: Copies custom domain file
4. **Jekyll**: Creates `.nojekyll` file
5. **Deploy**: Pushes to `gh-pages` branch

## 🌍 Live URLs

After deployment, your site will be available at:

- **Custom Domain**: https://larien.dev
- **GitHub Pages**: https://larien.github.io/dev

## ⚠️ Troubleshooting

### Common Issues

**404 Errors**
- Check `publicPath` in `vue.config.js`
- Ensure CNAME file is present
- Verify GitHub Pages settings

**Build Failures**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try deployment again
npm run deploy
```

**Custom Domain Not Working**
- Check DNS settings point to GitHub Pages
- Verify CNAME file contains correct domain
- Wait for DNS propagation (up to 24 hours)

### Debug Mode
For detailed deployment logs:
```bash
DEBUG=gh-pages npm run deploy
```

## 📈 Performance Optimizations

The build includes:
- ✅ **Code Splitting**: Vendor chunks separated
- ✅ **Tree Shaking**: Unused code removed
- ✅ **Minification**: CSS and JS compressed
- ✅ **Asset Optimization**: Images and fonts optimized
- ✅ **Source Maps**: Disabled for production

## 🔄 Continuous Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml` for automatic deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Deploy to GitHub Pages
        run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `npm run deploy` | **Full deployment** (recommended) |
| `npm run build` | Build only |
| `npm run preview` | Preview build locally |
| `npm run clean` | Clean build directory |
| `npm run dev` | Development server |

---

**Ready to deploy? Run `npm run deploy` and your site will be live! 🚀** 