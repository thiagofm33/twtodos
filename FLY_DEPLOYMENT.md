# Fly.io Deployment Guide

## Prerequisites

1. **Create a Fly.io account** (if you don't have one):
   - Go to https://fly.io
   - Sign up (you can use GitHub for quick signup)

2. **Install the Fly CLI**:
   ```bash
   # macOS
   brew install flyctl
   
   # Linux (curl)
   curl -L https://fly.io/install.sh | sh
   
   # Windows (or using npm)
   npm install -g flyctl
   ```

3. **Authenticate with Fly.io**:
   ```bash
   flyctl auth login
   ```

## Configuration

The `fly.toml` file has been created with default settings:
- **Region**: `gru` (São Paulo, Brazil) - Change in `fly.toml` if needed
- **App name**: `twtodos` - You'll need to create a unique name on Fly.io
- **Memory**: 512MB
- **CPU**: 1 shared-cpu (good for low-traffic apps)

### Change the app name (optional but recommended):

Edit `fly.toml` and change the `app` field to a unique name:
```toml
app = "your-unique-app-name"
```

### Available regions:
```
gru (São Paulo, Brazil)
lhr (London, UK)
iad (Washington DC, USA)
sea (Seattle, USA)
syd (Sydney, Australia)
```

## Deployment Steps

1. **Create the app on Fly.io**:
   ```bash
   flyctl apps create your-unique-app-name
   ```

2. **Deploy the application**:
   ```bash
   flyctl deploy
   ```

   Or use the shorthand:
   ```bash
   fly deploy
   ```

3. **View deployment status**:
   ```bash
   flyctl status
   ```

4. **View logs**:
   ```bash
   flyctl logs
   ```

5. **Visit your app**:
   ```bash
   flyctl open
   ```
   Or visit: `https://your-unique-app-name.fly.dev`

## Environment Variables

If your app needs environment variables, set them with:
```bash
flyctl secrets set KEY=value
```

Example:
```bash
flyctl secrets set NEXT_PUBLIC_API_URL=https://api.example.com
```

View all secrets:
```bash
flyctl secrets list
```

## Scaling & Resource Management

### Scale the number of instances:
```bash
flyctl scale count 2  # Run 2 instances
```

### Update machine resources:
Edit `fly.toml` and modify the `[[vm]]` section:
```toml
[[vm]]
  memory = "1024mb"  # Increase to 1GB
  cpus = 2           # Increase to 2 CPUs
```

Then deploy:
```bash
fly deploy
```

## Troubleshooting

### Check deployment logs:
```bash
flyctl logs
```

### SSH into the machine:
```bash
flyctl ssh console
```

### Scale down instances:
```bash
flyctl scale count 0  # Stop all instances
flyctl scale count 1  # Resume with 1 instance
```

### Rebuild and redeploy:
```bash
flyctl deploy --build-only     # Only build Docker image
flyctl deploy --force-machines  # Force rebuild
```

## Monitoring

- **Dashboard**: https://fly.io/dashboard
- **Metrics**: View CPU, memory, and request metrics in the dashboard
- **Alerts**: Set up alerts for downtime in the dashboard

## Cost Information

As of 2026, Fly.io offers:
- **Free tier**: 3 shared-cpu 256MB VMs
- **Payment**: $0.0684/month per shared-cpu VM (512MB)
- **Bandwidth**: First 30GB/month free, then $0.02/GB

Your current setup (1 shared-cpu, 512MB) costs ~$0.0684/month (1 VM) if it's not in the free tier.

## Additional Commands

```bash
# List all apps
flyctl apps list

# Stop the app
flyctl scale count 0

# Delete the app
flyctl apps destroy your-unique-app-name

# Show current status
flyctl status

# View machine details
flyctl machines list
```
