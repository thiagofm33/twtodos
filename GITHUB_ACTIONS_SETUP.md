# GitHub Actions Deployment Guide

This project uses GitHub Actions to automatically build and deploy to Fly.io on every push to the `main` branch.

## Setup Instructions

### 1. Get Your Fly.io API Token

First, you need to authenticate with Fly.io and get an API token:

```bash
# Login to Fly.io CLI (if not already authenticated)
flyctl auth login

# Get your auth token
flyctl auth token
```

This will output your API token.

### 2. Add the Secret to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Create a secret named `FLY_API_TOKEN`
5. Paste your Fly.io API token as the value
6. Click **Add secret**

### 3. Configure Fly.io App Name (if needed)

The current `fly.toml` has the app name set to `twtodos-thiagofm33`. If you want to use a different app name, update it in `fly.toml`:

```toml
app = 'your-unique-app-name'
```

Then deploy it first manually:
```bash
flyctl deploy
```

### 4. Push to Main Branch

Once configured, every push to the `main` branch will trigger:

1. **Build Job**: 
   - Checks out code
   - Sets up Node.js
   - Installs dependencies
   - Builds the Next.js app
   - Runs linter (if available)

2. **Deploy Job** (only on main branch):
   - Deploys to Fly.io using your API token

## Monitoring Deployments

1. **View workflow runs**: Go to your GitHub repository → **Actions** tab
2. **View live logs**: Click on any workflow run to see detailed logs
3. **View deployment status**: Use `flyctl status` or visit the Fly.io dashboard

## Environment Variables

If your app needs environment variables on production, add them to Fly.io:

```bash
flyctl secrets set KEY=value ANOTHER_KEY=another_value
```

Or via GitHub Actions, if you need different secrets for CI/CD:
- Go to **Settings** → **Secrets and variables** → **Actions**
- Add additional secrets as needed
- Reference them in the workflow file using `${{ secrets.SECRET_NAME }}`

## Troubleshooting

### Deployment fails with "app does not exist"
- Make sure the app name in `fly.toml` matches an existing app on Fly.io
- Alternatively, create the app: `flyctl apps create your-app-name`

### "Invalid API Token"
- Verify the `FLY_API_TOKEN` secret is correctly set in GitHub Settings
- Generate a new token with `flyctl auth token` if needed

### Build fails
- Check the GitHub Actions logs for error details
- Ensure `npm run build` works locally first
- Verify Node.js version compatibility (using v18 by default)

## Manual Deployment (Fallback)

If needed, you can still deploy manually:

```bash
flyctl deploy
```

## Disabling Auto-Deploy

To stop auto-deployment temporarily:
1. Go to `.github/workflows/deploy.yml`
2. Comment out or remove the `deploy` job
3. Push the changes

To re-enable, uncomment the job and push again.
