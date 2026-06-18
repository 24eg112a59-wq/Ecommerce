import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoAccounts } from '../data/catalog';
import apiClient from '../utils/apiClient';

const AuthContext = createContext(null);

const TOKEN_KEY = 'shopez_token';
const USER_KEY = 'shopez_user';

const loadStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

const loadStoredToken = () => localStorage.getItem(TOKEN_KEY) || '';

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
  };
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(loadStoredUser);
  const [token, setToken] = useState(loadStoredToken);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setSessionReady(true);
        return;
      }

      try {
        const { data } = await apiClient.get('/auth/profile');
        setCurrentUser(normalizeUser(data.user));
      } catch (error) {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setCurrentUser(null);
        setToken('');
      } finally {
        setSessionReady(true);
      }
    };

    restoreSession();
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, [currentUser, token]);

  const login = async ({ email, password }) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      const normalizedUser = normalizeUser(data.user);
      setCurrentUser(normalizedUser);
      setToken(data.token);
      return normalizedUser;
    } catch (error) {
      const matchedUser = demoAccounts.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );

      if (!matchedUser) {
        throw new Error(
          error.response?.data?.message || 'Invalid email or password'
        );
      }

      const fallbackUser = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      };

      setCurrentUser(fallbackUser);
      setToken(`demo-token-${matchedUser.id}`);
      return fallbackUser;
    }
  };

  const register = async ({ name, email, password, role = 'user' }) => {
    try {
      const { data } = await apiClient.post('/auth/register', { name, email, password, role });
      const normalizedUser = normalizeUser(data.user);
      setCurrentUser(normalizedUser);
      setToken(data.token);
      return normalizedUser;
    } catch (error) {
      const existingUser = demoAccounts.find((user) => user.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        throw new Error(error.response?.data?.message || 'A user with this email already exists');
      }

      const fallbackUser = {
        id: `u${Date.now()}`,
        name,
        email,
        role: role === 'admin' ? 'admin' : 'user',
      };

      setCurrentUser(fallbackUser);
      setToken(`demo-token-${fallbackUser.id}`);
      return fallbackUser;
    }
  };

  const logout = async () => {
    try {
      if (token && !token.startsWith('demo-token-')) {
        await apiClient.post('/auth/logout');
      }
    } catch (error) {
      // Clear local session even if the backend logout request fails.
    } finally {
      setCurrentUser(null);
      setToken('');
    }
  };

  const updateProfile = (nextProfile) => {
    setCurrentUser((existingUser) => ({
      ...existingUser,
      ...nextProfile,
    }));
  };

  const value = useMemo(
    () => ({
      users: currentUser ? [currentUser] : demoAccounts.map(({ password, ...user }) => user),
      currentUser,
      token,
      isAuthenticated: Boolean(currentUser),
      isAdmin: currentUser?.role === 'admin',
      sessionReady,
      login,
      register,
      logout,
      updateProfile,
    }),
    [currentUser, sessionReady, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
