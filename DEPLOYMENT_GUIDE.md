# 🚀 GitHub Deployment Guide

This guide will walk you through deploying your Image Search App to GitHub step by step.

---

## 📋 Prerequisites

- Git installed on your machine
- GitHub account created
- Project ready to deploy

---

## 🔧 Step-by-Step Deployment

### Step 1: Initialize Git Repository

```bash
# Navigate to your project root
cd "/Users/shrushtiparkar/Desktop/image-search-app "

# Initialize git repository
git init

# Check git status
git status
```

### Step 2: Create .gitignore Files

Your project already has .gitignore files, but let's verify they're correct.

#### Check Client .gitignore
```bash
cat client/.gitignore
```

Should contain:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

#### Create Server .gitignore
The server folder needs a .gitignore to protect sensitive data:

```bash
# Navigate to server directory
cd server

# Create .gitignore if it doesn't exist
touch .gitignore
```

Add this content to `server/.gitignore`:
```
# Environment variables (CRITICAL - DO NOT COMMIT)
.env

# Dependencies
node_modules/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

### Step 3: Create Root .gitignore

```bash
# Go back to project root
cd ..

# Create root .gitignore
touch .gitignore
```

Add this content to root `.gitignore`:
```
# Environment variables
.env
*.env

# Dependencies
node_modules/
*/node_modules/

# Build outputs
build/
dist/
*/build/
*/dist/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
logs/

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
coverage/
.nyc_output/
```

### Step 4: Stage Your Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

**⚠️ IMPORTANT:** Verify that `.env` file is NOT listed in files to be committed!

### Step 5: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: Image Search App with OAuth authentication"
```

### Step 6: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon in the top right
3. Select **New repository**
4. Fill in the details:
   - **Repository name:** `image-search-app`
   - **Description:** `A modern image search application with OAuth authentication and search history tracking`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

### Step 7: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/shruparkar1234/image-search-app.git

# Verify remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 8: Create .env.example File

Create a template file to show others what environment variables are needed:

```bash
# Create .env.example in server directory
cd server
touch .env.example
```

Add this content to `server/.env.example`:
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/image-search-app
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/image-search-app

# Session Secret (Generate a random string)
SESSION_SECRET=your-super-secret-session-key-change-this

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# Unsplash API
UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here

# Server Configuration
PORT=5050
CLIENT_URL=http://localhost:3000
```

Commit and push this file:

```bash
cd ..
git add server/.env.example
git commit -m "Add .env.example template for environment variables"
git push
```

---

## 🔒 Security Checklist

Before pushing to GitHub, verify:

- [ ] `.env` file is in `.gitignore`
- [ ] `.env` is NOT showing in `git status`
- [ ] `node_modules/` folders are ignored
- [ ] `.env.example` has placeholder values only
- [ ] No API keys or secrets in code

### Check if .env is Tracked

```bash
# This should return nothing
git ls-files | grep .env$

# If it shows .env, remove it immediately:
git rm --cached server/.env
git commit -m "Remove .env from tracking"
git push
```

---

## 📦 Additional Git Commands

### Update Your Code

```bash
# Check status
git status

# Add specific files
git add <filename>

# Or add all changes
git add .

# Commit changes
git commit -m "Your descriptive commit message"

# Push to GitHub
git push
```

### Create Branches

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Push branch to GitHub
git push -u origin feature/new-feature
```

### Pull Latest Changes

```bash
# Pull latest changes from GitHub
git pull origin main
```

---

## 🌐 Deploy to Hosting Platforms

### Option 1: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **New Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
6. Click **Deploy**

### Option 2: Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Sign in with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name:** image-search-app-backend
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add Environment Variables (all from your .env)
7. Click **Create Web Service**

### Option 3: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Add environment variables
6. Deploy

### Update Environment Variables for Production

After deploying, update these in your hosting platform:

```env
# Update CLIENT_URL to your Vercel URL
CLIENT_URL=https://your-app.vercel.app

# Update MONGO_URI to MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/image-search-app

# Update OAuth callback URLs in Google/GitHub settings
# Google: https://your-backend.render.com/auth/google/callback
# GitHub: https://your-backend.render.com/auth/github/callback
```

---

## 📝 Git Best Practices

### Commit Message Convention

```bash
# Feature
git commit -m "feat: add user profile page"

# Bug fix
git commit -m "fix: resolve login redirect issue"

# Documentation
git commit -m "docs: update README with deployment steps"

# Styling
git commit -m "style: improve button animations"

# Refactoring
git commit -m "refactor: optimize search query logic"
```

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent fixes

---

## 🆘 Common Issues

### Issue 1: .env File Accidentally Committed

```bash
# Remove from git tracking
git rm --cached server/.env

# Update .gitignore
echo ".env" >> .gitignore

# Commit changes
git add .gitignore
git commit -m "Remove .env and update .gitignore"
git push

# ⚠️ IMPORTANT: Regenerate all API keys and secrets!
```

### Issue 2: Large Files Error

```bash
# Remove large files
git rm --cached path/to/large/file

# Commit and push
git commit -m "Remove large file"
git push
```

### Issue 3: Merge Conflicts

```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in your editor
# After resolving:
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 📚 Useful Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)

---

## ✅ Verification Checklist

After deployment to GitHub:

- [ ] Repository is created on GitHub
- [ ] All code is pushed successfully
- [ ] `.env` file is NOT in the repository
- [ ] `.env.example` is in the repository
- [ ] README.md is visible on GitHub
- [ ] Repository description is set
- [ ] Topics/tags are added for discoverability
- [ ] License is included

---

## 🎉 Success!

Your project is now on GitHub! 

**Repository URL:** `https://github.com/shruparkar1234/image-search-app`

### Next Steps:

1. Add repository description on GitHub
2. Add topics: `react`, `nodejs`, `mongodb`, `oauth`, `image-search`, `express`
3. Enable GitHub Pages for documentation (optional)
4. Set up GitHub Actions for CI/CD (optional)
5. Add collaborators if working in a team

---

**Need help?** Create an issue in your repository or reach out!

