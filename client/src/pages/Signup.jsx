import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('/auth/signup', form);
      navigate('/login'); // redirect after signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="border p-6 rounded w-full max-w-sm" onSubmit={submit}>
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>

        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-4"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Create Account
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
