# Authentication Integration Guide

Simple guide for integrating authentication in React and Next.js applications.

## Available API Endpoints

```javascript
BASE_URL = 'http://localhost:5000/api'

// Auth endpoints
POST   /auth/register      // Register new user
POST   /auth/login        // Login user
GET    /auth/logout       // Logout user
POST   /auth/verify-email // Verify email with OTP
GET    /auth/google       // Google OAuth login
GET    /auth/facebook     // Facebook OAuth login
GET    /auth/user         // Get current user
```

## React Integration

### 1. Auth Context Setup
```jsx
// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get('/api/auth/user');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };
    
    checkUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    return res.data;
  };

  // Logout function
  const logout = async () => {
    await axios.get('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 2. Login Page
```jsx
// src/pages/Login.js
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        
        {/* OAuth Buttons */}
        <button onClick={() => window.location.href = '/api/auth/google'}>
          Login with Google
        </button>
        <button onClick={() => window.location.href = '/api/auth/facebook'}>
          Login with Facebook
        </button>
      </form>
    </div>
  );
}
```

### 3. Protected Route
```jsx
// src/components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  
  return user ? children : null;
}

// Usage in App.js
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}
```

## Next.js Integration

### 1. Auth API Route
```javascript
// pages/api/auth/[...auth].js
export default async function handler(req, res) {
  const { method, query: { auth } } = req;
  
  // Forward request to authentication server
  const response = await fetch(`${process.env.API_URL}/auth/${auth.join('/')}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers
    },
    body: method !== 'GET' ? JSON.stringify(req.body) : undefined
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
```

### 2. Protected Page Example
```jsx
// pages/dashboard.js
import { withAuth } from '../utils/withAuth';

function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <button onClick={async () => {
        await fetch('/api/auth/logout');
        window.location.href = '/login';
      }}>
        Logout
      </button>
    </div>
  );
}

// Protect this page
export const getServerSideProps = withAuth(async (context, user) => {
  return {
    props: { user }
  };
});
```

### 3. Auth HOC
```javascript
// utils/withAuth.js
export function withAuth(gssp) {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      // Verify user
      const response = await fetch(`${process.env.API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error('Not authenticated');
      }

      // Call page's getServerSideProps
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

## Usage Examples

### React App Setup
```jsx
// src/App.js
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### Next.js App Setup
```jsx
// pages/_app.js
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
```
