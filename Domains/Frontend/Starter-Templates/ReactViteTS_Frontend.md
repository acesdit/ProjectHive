# React + TypeScript + Vite Starter Template

**Contributor:** Tejas-Santosh-Nalawade
**Domain:** Frontend
**Last Updated:** October 2024

## 📦 What's Included

This is a modern, production-ready starter template for building React applications with TypeScript and Vite. It comes pre-configured with essential tools and best practices to help you start developing immediately
### ✨ Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Latest React with Hooks and Concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router v6** - Client-side routing
- 📡 **Axios** - HTTP client with interceptors configured
- 🔧 **ESLint** - Code linting with React and TypeScript rules
- 💅 **Prettier** - Code formatting
- 🧪 **Vitest** - Unit testing framework
- 🎭 **React Testing Library** - Component testing utilities
- 🌍 **Environment Variables** - Pre-configured .env support
- 📱 **Responsive** - Mobile-first design approach
- 🔄 **Hot Module Replacement** - Instant updates during development

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm

### Installation

1. **Use this template or clone**
   ```bash
   # Option 1: Using degit
   npx degit yourusername/react-vite-ts-template my-app
   
   # Option 2: Clone
   git clone https://github.com/yourusername/react-vite-ts-template.git my-app
   ```

2. **Navigate to project directory**
   ```bash
   cd my-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
react-vite-ts-template/
├── public/                      # Static assets
│   ├── vite.svg
│   └── favicon.ico
├── src/
│   ├── assets/                  # Images, fonts, etc.
│   │   └── react.svg
│   ├── components/              # Reusable components
│   │   ├── common/             # Common UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.test.tsx
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   └── layout/             # Layout components
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Sidebar/
│   ├── pages/                   # Page components
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.test.tsx
│   │   ├── About/
│   │   └── NotFound/
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   ├── services/                # API services
│   │   ├── api.ts              # Axios instance
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── utils/                   # Utility functions
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── styles/                  # Global styles
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── App.tsx                  # Main App component
│   ├── App.test.tsx            # App tests
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite type definitions
├── .env.example                 # Environment variables template
├── .eslintrc.cjs               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore
├── index.html                   # HTML template
├── package.json
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript config for Node
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
└── README.md
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=My React App
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

**Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client.

### TypeScript Configuration

The template includes two TypeScript configurations:

1. **tsconfig.json** - For application code
2. **tsconfig.node.json** - For Node.js tools (Vite config, etc.)

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
```

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

### Testing
```bash
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## 🧩 Example Components

### Button Component

```typescript
// src/components/common/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Custom Hook Example

```typescript
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
```

### API Service Example

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 🎯 Best Practices Included

### Code Organization
- ✅ Feature-based folder structure
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Custom hooks for logic reuse

### TypeScript
- ✅ Strict mode enabled
- ✅ Proper type definitions
- ✅ Interface over type when possible
- ✅ Avoid `any` type

### Performance
- ✅ Code splitting with lazy loading
- ✅ Optimized bundle size
- ✅ Tree shaking enabled
- ✅ Production build optimization

### Testing
- ✅ Component testing setup
- ✅ Unit testing utilities
- ✅ Test coverage configuration
- ✅ Mock API responses

### Security
- ✅ Environment variable protection
- ✅ HTTPS in production
- ✅ Secure HTTP headers
- ✅ XSS protection

## 🔌 Adding Common Features

### State Management (Redux Toolkit)
```bash
npm install @reduxjs/toolkit react-redux
```

### Form Handling (React Hook Form)
```bash
npm install react-hook-form
```

### UI Components (shadcn/ui)
```bash
npx shadcn-ui@latest init
```

### Icons (React Icons)
```bash
npm install react-icons
```

### Date Handling (date-fns)
```bash
npm install date-fns
```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🐛 Troubleshooting

### Port Already in Use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change to your preferred port
}
```

### TypeScript Errors
Run type checking:
```bash
npm run type-check
```

### Module Not Found
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vitest Guide](https://vitest.dev/guide/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - free to use for any project!

---

**Happy Coding! 🚀**

*This is a sample starter template for ProjectHive. Customize it according to your project needs when contributing.*
