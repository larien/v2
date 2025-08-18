# 🗺️ Travel Map - Makefile
# Simple commands for development and deployment

.PHONY: help install dev build clean deploy preview lint

# Default target
help:
	@echo "🗺️  Travel Map - Available Commands:"
	@echo ""
	@echo "📦 Setup:"
	@echo "  install    - Install dependencies"
	@echo ""
	@echo "🚀 Development:"
	@echo "  dev        - Start development server"
	@echo "  build      - Build for production"
	@echo "  preview    - Build and preview production build"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  clean      - Clean build directory"
	@echo "  lint       - Run ESLint"
	@echo ""
	@echo "🚀 Deployment:"
	@echo "  deploy     - Full deployment to GitHub Pages"
	@echo "  deploy:quick - Quick deployment (build + deploy)"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed!"

# Start development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Build for production
build:
	@echo "🔨 Building for production..."
	npm run build
	@echo "✅ Build completed!"

# Clean build directory
clean:
	@echo "🧹 Cleaning build directory..."
	npm run clean
	@echo "✅ Build directory cleaned!"

# Run ESLint
lint:
	@echo "🔍 Running ESLint..."
	npm run lint

# Preview production build
preview:
	@echo "👀 Building and previewing production build..."
	npm run preview

# Full deployment (uses the deploy script)
deploy:
	@echo "🚀 Starting full deployment..."
	npm run deploy

# Quick deployment (build + deploy)
deploy:quick:
	@echo "⚡ Quick deployment..."
	npm run deploy:quick

# Development workflow (install + dev)
setup: install dev

# Production workflow (clean + build + deploy)
release: clean build deploy
