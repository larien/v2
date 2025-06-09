#!/usr/bin/env node

/**
 * Deployment script for GitHub Pages
 * Handles build, CNAME setup, and deployment in one command
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const step = (message) => log(`\n🚀 ${message}`, colors.blue + colors.bright);
const success = (message) => log(`✅ ${message}`, colors.green);
const warning = (message) => log(`⚠️  ${message}`, colors.yellow);
const error = (message) => log(`❌ ${message}`, colors.red);

try {
  log("\n🗺️  Vue.js Travel Map - GitHub Pages Deployment", colors.bright);
  log("=" * 50);

  // Step 1: Clean previous build
  step("Cleaning previous build...");
  if (fs.existsSync("dist")) {
    execSync("rm -rf dist", { stdio: "inherit" });
    success("Previous build cleaned");
  } else {
    log("No previous build found");
  }

  // Step 2: Build the project
  step("Building Vue.js project...");
  execSync("npm run build", { stdio: "inherit" });
  success("Build completed successfully");

  // Step 3: Copy CNAME file
  step("Setting up custom domain...");
  const cnameSource = path.join(__dirname, "../../CNAME");
  const cnameTarget = path.join(__dirname, "../dist/CNAME");

  if (fs.existsSync(cnameSource)) {
    fs.copyFileSync(cnameSource, cnameTarget);
    const domain = fs.readFileSync(cnameSource, "utf8").trim();
    success(`CNAME file copied - Custom domain: ${domain}`);
  } else {
    warning("No CNAME file found - using default GitHub Pages domain");
  }

  // Step 4: Create .nojekyll file (for GitHub Pages compatibility)
  step("Creating .nojekyll file...");
  const nojekyllPath = path.join(__dirname, "../dist/.nojekyll");
  fs.writeFileSync(nojekyllPath, "");
  success(".nojekyll file created (prevents Jekyll processing)");

  // Step 5: Deploy to GitHub Pages
  step("Deploying to GitHub Pages...");
  execSync("npx gh-pages -d dist", { stdio: "inherit" });
  success("Successfully deployed to GitHub Pages!");

  // Final success message
  log("\n🎉 Deployment completed successfully!", colors.green + colors.bright);

  const domain = fs.existsSync(cnameSource)
    ? fs.readFileSync(cnameSource, "utf8").trim()
    : "your-username.github.io/your-repo";

  log(`\n🌐 Your app will be available at: https://${domain}`);
  log("⏰ Note: It may take a few minutes for changes to be visible");
} catch (err) {
  error("Deployment failed!");
  console.error(err.message);
  process.exit(1);
}
