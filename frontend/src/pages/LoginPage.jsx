import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Input from '../components/common/Input';
import useAuth from '../hooks/useAuth';

// Authenticate an existing customer and return them to the requested page.
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || '/foods', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Yum Yard</h1>
        <ErrorMessage message={error} />
        <Input id="login-email" label="Email" name="email" onChange={(event) => setFormData({ ...formData, email: event.target.value })} required type="email" value={formData.email} />
        <Input id="login-password" label="Password" name="password" onChange={(event) => setFormData({ ...formData, password: event.target.value })} required type="password" value={formData.password} />
        <button className="button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Logging in...' : 'Log in'}</button>
        <p>New to Yum Yard? <Link to="/register">Create an account</Link></p>
      </form>
    </main>
  );
}

export default LoginPage;
