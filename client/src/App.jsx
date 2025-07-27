import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  if (!token) return <LoginModal onLogin={handleLogin} />;
  return <Dashboard />;
}
