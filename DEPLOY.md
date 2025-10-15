# Deployment Guide for Easypanel

This guide explains how to deploy the LinkedIn Post Dashboard on Easypanel.

## Prerequisites

- Easypanel account
- GitHub repository connected to Easypanel

## Deployment Steps

### Option 1: Using Easypanel UI

1. **Create New App**
   - Log in to your Easypanel dashboard
   - Click "Create App"
   - Choose "Deploy from GitHub"

2. **Connect Repository**
   - Select your GitHub repository: `DevIslandAI/linkedin_app`
   - Choose the branch: `main`

3. **Configure Build**
   - Build Method: Dockerfile
   - Dockerfile Path: `./Dockerfile`
   - Build Context: `.`

4. **Configure Service**
   - Port: `80`
   - Protocol: HTTP
   - Health Check Path: `/health` (optional)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build and deployment to complete

### Option 2: Using Easypanel CLI

```bash
# Install Easypanel CLI (if not already installed)
npm install -g easypanel-cli

# Login to Easypanel
easypanel login

# Deploy the application
easypanel deploy
```

## Docker Build Locally (Testing)

To test the Docker build locally before deploying:

```bash
# Build the Docker image
docker build -t linkedin-dashboard .

# Run the container
docker run -p 80:80 linkedin-dashboard

# Or use docker-compose
docker-compose up -d
```

Visit `http://localhost` to view the application.

## Environment Variables

Currently, this application does not require environment variables. If you need to add any in the future, configure them in the Easypanel dashboard under "Environment Variables".

## Troubleshooting

### Build Fails

- Check that all dependencies in `package.json` are correct
- Ensure the build output directory matches the Dockerfile (`build`)
- Review build logs in Easypanel dashboard

### Application Won't Start

- Verify the port configuration (should be 80)
- Check nginx logs for errors
- Ensure health check endpoint is accessible at `/health`

### Routing Issues

- The nginx configuration includes SPA routing support
- All routes should fall back to `index.html`

## Health Check

The application includes a health check endpoint at `/health` that returns a 200 status with "healthy" message.

## Performance Optimization

- Static assets are cached for 1 year
- Gzip compression is enabled
- Build output is optimized by Vite

## Support

For issues specific to Easypanel, refer to [Easypanel Documentation](https://easypanel.io/docs).
