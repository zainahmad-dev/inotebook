import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [error, setError] = useState('');

  const host = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.cpassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const json = await response.json();
    if (response.ok && json.authtoken) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      setError(json.error || 'Unable to sign up.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '480px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Create account</h4>
          <p className="text-muted">Start organizing your notes securely.</p>
          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                minLength={3}
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
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
                value={form.password}
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
            <div>
              <label htmlFor="cpassword" className="form-label">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={form.cpassword}
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
            {error && <div className="text-danger small">{error}</div>}
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
          <div className="mt-3 text-muted">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
