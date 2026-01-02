import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const host = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    if (response.ok && json.authtoken) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      setError(json.error || 'Invalid credentials');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '480px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Welcome back</h4>
          <p className="text-muted">Sign in to manage your notes.</p>
          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            {error && <div className="text-danger small">{error}</div>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <div className="mt-3 text-muted">
            New here? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
