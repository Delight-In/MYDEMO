import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const { register, loading } = useAuth();

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };

    const met = Object.values(requirements).filter(Boolean).length;
    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][met];
    
    return strength;
  };

  const handlePasswordChange = (password) => {
    setFormData({...formData, password});
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);
    if (!result.success) {
      setMessage(result.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today</p>
        
        {message && <div className="message error">{message}</div>}
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
          {passwordStrength && (
            <div className={`password-strength ${passwordStrength.toLowerCase().replace(' ', '-')}`}>
              Password Strength: {passwordStrength}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
        
        <div className="password-requirements">
          <h4>Password must contain:</h4>
          <ul>
            <li>At least 8 characters</li>
            <li>Uppercase letter (A-Z)</li>
            <li>Lowercase letter (a-z)</li>
            <li>Number (0-9)</li>
            <li>Special character (!@#$% etc.)</li>
          </ul>
        </div>
        
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;