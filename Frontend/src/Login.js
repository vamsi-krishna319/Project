import React, { useState } from 'react';
import { login } from './api';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    const data = await login(email, password);
    if (data.token) {
      onSuccess({ token: data.token, user: data.user });
    } else {
      setErr(data.error || 'Login failed');
    }
  }

  return (
    <div style={{maxWidth:400, margin:'50px auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" /><br/>
        <button>Login</button>
      </form>
      {err && <p style={{color:'red'}}>{err}</p>}
      <p>Demo login: hire-me@anshumat.org / HireMe@2025!</p>
    </div>
  );
}
