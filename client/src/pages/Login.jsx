import React, { useState, useContext } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login(){
  const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data);
      nav('/');
    } catch (err) { alert(err.response?.data?.message || 'Login error'); }
  };
  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-2"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-2"/>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
    </form>
  );
}
