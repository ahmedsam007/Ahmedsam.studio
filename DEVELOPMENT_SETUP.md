# Development Environment Setup

## Local Development (Cursor)

Your project is already configured for local development with Vite. Here's how to get started:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access your application:**
   - Open your browser and go to `http://localhost:5173`
   - The development server will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Development Features

- **Hot Module Replacement (HMR)** - Changes reflect immediately without page refresh
- **Fast Refresh** - React components update instantly
- **Source Maps** - Easy debugging with original source code
- **Tailwind CSS** - Utility-first CSS framework for styling
- **PostCSS** - CSS processing with autoprefixer

## Vercel Development Environment

### Option 1: Vercel CLI (Recommended for Development)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link your project:**
   ```bash
   vercel link
   ```

4. **Deploy to development environment:**
   ```bash
   vercel --dev
   ```

### Option 2: Vercel Dashboard

1. **Connect your GitHub repository** to Vercel
2. **Automatic deployments** will be created for:
   - Production: `main` branch
   - Preview: All other branches and pull requests

### Environment Variables

If you need environment variables, create a `.env.local` file:
```bash
# .env.local
VITE_API_URL=your_api_url_here
VITE_ANALYTICS_ID=your_analytics_id
```

### Development Workflow

1. **Local Development:**
   - Make changes in Cursor
   - Test locally with `npm run dev`
   - Commit and push to GitHub

2. **Vercel Preview:**
   - Create a new branch for features
   - Push to GitHub
   - Vercel automatically creates a preview deployment
   - Share the preview URL for testing

3. **Production Deployment:**
   - Merge to `main` branch
   - Vercel automatically deploys to production

## Project Structure

```
ahmedsam.studio/
├── src/
│   ├── components/     # React components
│   ├── styles/        # CSS and styling
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── vercel.json        # Vercel deployment configuration
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill the process using port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Dependencies issues:**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Vercel deployment issues:**
   ```bash
   # Check Vercel logs
   vercel logs
   ```

### Performance Tips

- Use React DevTools for debugging
- Enable Vite's built-in performance profiling
- Monitor bundle size with `npm run build`
- Use Vercel Analytics for performance monitoring

## Next Steps

1. **Set up Git hooks** for code quality:
   ```bash
   npm install --save-dev husky lint-staged
   ```

2. **Add testing framework:**
   ```bash
   npm install --save-dev vitest @testing-library/react
   ```

3. **Configure TypeScript** (optional):
   ```bash
   npm install --save-dev typescript @types/react @types/react-dom
   ```

Your development environment is now ready! 🚀 