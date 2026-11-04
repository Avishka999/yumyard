import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Input from '../components/common/Input';
import useAuth from '../hooks/useAuth';

// Validate registration fields and create a new customer account.
function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(formData);
      navigate('/foods', { replace: true });
    } catch (requestError) {
      const validationErrors = requestError.response?.data?.errors;
      const firstValidationError = validationErrors
        ? Object.values(validationErrors).flat()[0]
        : null;

      setError(firstValidationError || requestError.response?.data?.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Join Yum Yard</p>
        <h1>Create your account</h1>
        <ErrorMessage message={error} />
        <Input id="register-name" label="Name" name="name" onChange={updateField} required value={formData.name} />
        <Input id="register-email" label="Email" name="email" onChange={updateField} required type="email" value={formData.email} />
        <Input id="register-password" label="Password" name="password" onChange={updateField} required type="password" value={formData.password} />
        <Input id="register-password-confirmation" label="Confirm password" name="password_confirmation" onChange={updateField} required type="password" value={formData.password_confirmation} />
        <button className="button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Creating account...' : 'Create account'}</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </main>
  );
}

export default RegisterPage;
