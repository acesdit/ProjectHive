# Frontend Integration Guide

This guide explains how to integrate the authentication system with your React or Next.js frontend application.

## Table of Contents
- [Setup](#setup)
- [React Integration](#react-integration)
- [Next.js Integration](#nextjs-integration)
- [Common Components](#common-components)

## Setup

1. First, install the required dependencies:

```bash
npm install axios @tanstack/react-query jwt-decode
# or
yarn add axios @tanstack/react-query jwt-decode
```

2. Environment Variables
   
Create a `.env.local` file in your frontend project:

```env
# For React
REACT_APP_API_URL=http://localhost:5000/api

# For Next.js
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## React Integration

1. Create Auth Context (`src/context/AuthContext.tsx`):

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  loading: boolean;
  loginWithOAuth: (provider: 'google' | 'facebook') => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`);
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const loginWithOAuth = (provider: 'google' | 'facebook') => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/${provider}`;
  };

  const logout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithOAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

2. Create Login Page (`src/pages/Login.tsx`):

```typescript
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginWithOAuth } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => loginWithOAuth('google')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => loginWithOAuth('facebook')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

3. Create Auth Callback Page (`src/pages/AuthCallback.tsx`):

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

4. Create Protected Route Component (`src/components/ProtectedRoute.tsx`):

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
```

## Next.js Integration

1. Create Auth API Route (`pages/api/auth/[...auth].ts`):

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth } = req.query;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${(auth as string[]).join('/')}`,
      {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {})
        },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
```

2. Create Auth HOC (`utils/withAuth.ts`):

```typescript
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function withAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { token } = parseCookies(context);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error('Not authenticated');
      }

      return await gssp(context, data.user);
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
}
```

## Common Components

1. Dashboard Example:

```typescript
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Your dashboard content */}
      </main>
    </div>
  );
}

// For Next.js, add getServerSideProps
export const getServerSideProps = withAuth(async (context, user) => {
  return {
    props: { user }
  };
});
```

## Implementation Steps

1. Set up your frontend project (React or Next.js)
2. Copy the relevant code sections based on your framework
3. Install required dependencies
4. Set up environment variables
5. Implement the auth routes in your app:
   ```typescript
   // React (App.tsx)
   <AuthProvider>
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/auth/callback" element={<AuthCallback />} />
       <Route path="/dashboard" element={
         <ProtectedRoute>
           <Dashboard />
         </ProtectedRoute>
       } />
     </Routes>
   </AuthProvider>

   // Next.js (_app.tsx)
   function MyApp({ Component, pageProps }) {
     return (
       <AuthProvider>
         <Component {...pageProps} />
       </AuthProvider>
     );
   }
   ```

6. Test the integration:
   - Try logging in with Google and Facebook
   - Verify protected routes work
   - Test token persistence
   - Verify logout functionality
