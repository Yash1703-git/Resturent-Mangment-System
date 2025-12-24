import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import API from '../api/api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', form);

      // save auth
      login(res.data);

      // redirect by role
      if (res.data.user.role === 'admin') {
        navigate('/admin/add-food');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {error && (
          <div className="text-red-600 mb-2 text-sm">
            {error}
          </div>
        )}

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* 🔽 SIGNUP LINK */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
