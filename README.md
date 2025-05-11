# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- Modern and responsive design
- Dark/Light mode support
- Smooth animations with Framer Motion
- Built with Next.js 15 and React 19
- Fully typed with TypeScript
- Styled with Tailwind CSS
- UI components from Radix UI
- Smooth scrolling with react-scroll

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Package Manager:** pnpm
- **Other Libraries:**
  - next-themes (dark/light mode)
  - react-scroll
  - lucide-react (icons)
  - tailwindcss-animate
  - class-variance-authority

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-link]
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Environment Setup

Make sure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v8 or higher)

## 📝 Project Structure

```
├── app/          # Next.js app directory
├── components/   # React components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── public/       # Static assets
├── styles/       # Global styles
└── utils/        # Helper functions
```

## 🎨 Customization

1. **Theme**: Modify the theme in `tailwind.config.ts`
2. **Components**: Find reusable components in the `components` directory
3. **Styles**: Global styles are in the `styles` directory

## 🚀 Deployment

This project can be deployed on any platform that supports Next.js, such as:
- Vercel (recommended)
- Netlify
- AWS Amplify

### Deploying to GitHub Pages

1. First, update your `next.config.mjs` file:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',  // Enable static exports
     images: {
       unoptimized: true,
     },
     basePath: '/your-repo-name', // Replace with your repository name
   };
   
   export default nextConfig;
   ```

2. Add a GitHub Actions workflow by creating `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ["main"]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: true

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v2
           with:
             version: 8
         - uses: actions/setup-node@v4
           with:
             node-version: 18
             cache: 'pnpm'
         - name: Install dependencies
           run: pnpm install
         - name: Build
           run: pnpm build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. Enable GitHub Pages in your repository:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

4. Push your changes to the main branch:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push
   ```

5. Your site will be automatically deployed when you push to the main branch. You can find the URL in the GitHub Pages section of your repository settings.

Note: Make sure to replace `your-repo-name` in the `next.config.mjs` file with your actual repository name.

## 📄 License

This project is open source and available under the MIT License. 