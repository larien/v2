# 🚀 Quick Deploy - TL;DR

## One Command Deployment

```bash
npm run deploy
```

That's it! Your site will be live at **https://larien.dev** 🌐

## What Happens?

1. ✅ Builds your Vue.js app
2. ✅ Copies CNAME for custom domain  
3. ✅ Deploys to GitHub Pages
4. ✅ Site goes live automatically

## Other Useful Command

```bash
npm run preview       # Preview before deploying
npm run build         # Build only
npm run clean         # Clean build files
```

## First Time Setup

If this is your first deployment:

1. Make sure GitHub Pages is enabled in your repo settings
2. Set source to "Deploy from a branch" → "gh-pages"
3. Run `npm run deploy`
4. Wait 2-3 minutes for it to go live

## Automatic Deployment (Optional)

Want automatic deployment on every git push?

1. Commit the `.github/workflows/deploy.yml` file
2. Push to GitHub
3. Every future push will auto-deploy! 🎉

---

**Ready? Run `npm run deploy` now! 🚀** 