import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export default function SearchBar(){
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [q, setQ] = useState(params.get('q') || '');

  const submit = (e) => {
    e.preventDefault();
    const usp = new URLSearchParams(window.location.search);
    if (q) usp.set('q', q); else usp.delete('q');
    navigate(`/menu?${usp.toString()}`);
  };
  return (
    <form onSubmit={submit} className="w-full ">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search dishes..." className="w-full border rounded p-2"/>
    </form>
  );
}
