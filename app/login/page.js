// /app/login/page.js (or similar)

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if token is present (i.e., user is already logged in)
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      router.push('/');  // Redirect if already logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push('/');  // Redirect to the main interface page
    } else {
      alert(data.message || 'Login Failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-8 rounded shadow-lg w-96">
        <h1 className="text-3xl text-center mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full p-3 border rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
