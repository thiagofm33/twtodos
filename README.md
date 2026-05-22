# TWTodos

A modern, responsive todo application built with React, Next.js, TypeScript, and Tailwind CSS. Perfect for managing daily tasks with a clean, intuitive interface.

> 📚 **Project Purpose**: This project was developed as part of an **AI study course** to demonstrate modern web development practices, including building full-stack applications, automation with GitHub Actions, and cloud deployment strategies.

## Features

✨ **Core Functionality**
- ✅ Create, read, and delete todos
- 🎯 Mark todos as completed
- 🗑️ Delete individual todos or clear all
- 🔄 Drag-and-drop to reorder todos
- 💾 Persistent storage using browser localStorage
- 🚀 Real-time updates with auto-save

📋 **Validation & UX**
- Minimum 3 characters per todo
- Todos must start with a capital letter
- Error messages with clear feedback
- Responsive design for mobile and desktop
- Smooth animations and transitions

🎨 **Technology Stack**
- **Framework**: [Next.js 16+](https://nextjs.org) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Runtime**: Node.js 18+
- **Deployment**: [Fly.io](https://fly.io) with Docker

## Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Git (for cloning the repository)

### Local Development

1. **Clone and install**:
```bash
git clone <repository-url>
cd twtodos
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

The app will automatically reload as you edit files. Local changes to `src/app/page.tsx` are reflected instantly.

### Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server on port 3000.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Todo application component
│   └── globals.css     # Global styles
public/                 # Static assets
Dockerfile              # Production container
Dockerfile.dev          # Development container
fly.toml               # Fly.io configuration
docker-compose.yml     # Production Docker setup
docker-compose-dev.yml # Development Docker setup
```

## Deployment

### Option 1: Automated Deployment (GitHub Actions)

This project includes automated deployment via GitHub Actions to Fly.io.

**Setup Instructions**:

1. **Add Fly.io API Token**:
   - Get your token: `flyctl auth token`
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add secret: `FLY_API_TOKEN`

2. **Deploy**:
   - Push to `main` branch
   - GitHub Actions automatically builds and deploys

**View deployment status**:
- GitHub repo → Actions tab
- Or use: `flyctl status`

For detailed setup, see [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)

### Option 2: Manual Deployment to Fly.io

1. **Prerequisites**:
   - Fly.io account (https://fly.io)
   - Fly CLI installed: `npm install -g flyctl` or `brew install flyctl`

2. **Setup**:
```bash
# Login to Fly.io
flyctl auth login

# Deploy the app
flyctl deploy
```

3. **Verify deployment**:
```bash
flyctl status
flyctl logs
flyctl open  # Opens your deployed app
```

**Environment Variables**:
```bash
flyctl secrets set KEY=value
```

See [FLY_DEPLOYMENT.md](FLY_DEPLOYMENT.md) for detailed Fly.io configuration.

### Option 3: Docker Deployment

**Production build**:
```bash
docker-compose up -d
```

**Development with hot reload**:
```bash
docker-compose -f docker-compose-dev.yml up
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint (if configured)

## Docker

**Build and run with Docker**:
```bash
docker build -t twtodos .
docker run -p 3000:3000 twtodos
```

The app runs on port 3000 inside the container and is mapped to port 3000 on your host.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

LocalStorage is required for todo persistence.

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Fly.io Docs](https://fly.io/docs)

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
