# 🚀 Moody - Firebase Vite React Template

A modern, production-ready starter template built with **Firebase**, **Vite**, **React 19**, **TypeScript**, and **TailwindCSS**. Features comprehensive SEO optimization, PWA capabilities, and Firebase authentication.

## ✨ Features

### 🔥 Modern Tech Stack
- **React 19** with TypeScript
- **Vite** for lightning-fast development
- **Firebase** authentication & Firestore
- **TailwindCSS 4** for styling
- **React Router v7** for navigation
- **Shadcn/ui** components

### 📱 PWA Ready
- Service worker support
- Offline capabilities
- App installation prompts
- Push notifications ready
- App shortcuts

### 🎯 SEO Optimized
- **Comprehensive meta tags** for social sharing
- **Open Graph** tags for WhatsApp, Facebook, Twitter
- **Structured data** (JSON-LD) for search engines
- **Sitemap.xml** and **robots.txt**
- **Canonical URLs** and **hreflang** tags
- **Performance optimizations** with DNS prefetch

### 🔐 Authentication
- Firebase Auth integration
- Protected routes
- User context management
- Login/logout functionality

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ChipLuxury-EWA/Moody---Vite-React-FireBase-starter-template.git
cd moody

# Install dependencies
npm install

# Set up Firebase (see FIREBASE_SETUP.md)
# Add your Firebase config to src/lib/firebase.ts

# Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── AuthProvider.tsx
│   ├── LoginForm.tsx
│   └── MainLayout.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configs
├── pages/              # Page components
├── router/             # React Router configuration
└── constants/          # App constants
```

## 🔧 SEO Configuration

This template includes comprehensive SEO setup:

### Meta Tags
- Primary meta tags with keywords
- Open Graph tags for social sharing
- Twitter Card tags
- WhatsApp-specific tags
- PWA meta tags

### Structured Data
- JSON-LD schema for search engines
- Software application markup
- Organization information

### Files Included
- `sitemap.xml` - For search engine indexing
- `robots.txt` - Crawler instructions
- `browserconfig.xml` - Windows tile configuration
- `site.webmanifest` - PWA configuration

## 🎨 Customization

### Branding
Update these files with your brand:
- `index.html` - Meta tags and titles
- `site.webmanifest` - App information
- `public/` - Icons and favicons

### SEO
Configure SEO in `index.html`:
- Update title and description
- Change keywords for your niche
- Update canonical URLs
- Modify structured data

### Firebase
Set up your Firebase project:
1. Follow `FIREBASE_SETUP.md`
2. Update `src/lib/firebase.ts`
3. Configure Firestore rules

## 🛠️ Built With

- [React 19](https://react.dev/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Backend Services
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [React Router](https://reactrouter.com/) - Routing

## 📈 SEO Keywords

This template is optimized for:
- Firebase template
- Vite React starter
- TypeScript template
- PWA template
- React authentication
- Modern web app template

## 📱 PWA Features

- 📱 **App Installation**: Users can install as native app
- 🔄 **Offline Support**: Works without internet
- 🎯 **App Shortcuts**: Quick access to key features
- 🎨 **Custom Splash Screen**: Branded loading experience
- 📱 **Mobile Optimized**: Responsive design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🎉**