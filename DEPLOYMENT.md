# GitHub Pages Deployment Guide

## Setup Instructions

1. **Enable GitHub Pages with GitHub Actions:**
   - Go to your repository: https://github.com/MattanAdi/LeadZone
   - Click **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Save the settings

2. **Trigger the Deployment:**
   - Go to **Actions** tab
   - If the workflow hasn't run, click **"Deploy to GitHub Pages"** workflow
   - Click **"Run workflow"** → **"Run workflow"**
   - Wait for it to complete (green checkmark)

3. **Access Your Site:**
   - Once deployed, your site will be available at:
   - https://mattanadi.github.io/LeadZone/

## Troubleshooting

### "Inactive" Status
- Make sure **Source** is set to **"GitHub Actions"** in Settings → Pages
- Check the Actions tab to see if the workflow completed successfully
- If workflow failed, check the error logs

### White Screen
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Check Network tab to see if assets are loading
- Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Assets Not Loading
- Verify the base path in `vite.config.js` is `/LeadZone/`
- Make sure you're accessing the site at the correct URL with trailing slash

