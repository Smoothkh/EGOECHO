import React, { useState } from 'react';
import axios from 'axios';

export default function LoginModal({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/login', { userId, password });
      onLogin(res.data.token);
    } catch (err) {
      setError('로그인 실패');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={submit} className="modal-content">
        <h2>로그인</h2>
        <input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
