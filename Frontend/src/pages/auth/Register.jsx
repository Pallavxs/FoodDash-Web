import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import AccountTypeSelector from '../../components/auth/AccountTypeSelector';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthFooter from '../../components/auth/AuthFooter';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser } from '../../redux/slice/authSlice';

export default function Register({ onToggleMode, onSuccess }) {
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    try {
      const data = await dispatch(registerUser({
        name,
        email,
        password,
        role,
      })).unwrap();

      if (onSuccess && data?.user) {
        onSuccess(data.user);
      }
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (validationError) setValidationError('');
    if (error) {
      dispatch(clearError());
    }
  };

  const displayError = validationError || error;

  return (
    <AuthCard mode="register">
      <AuthHeader mode="register" />

      <AccountTypeSelector role={role} onChangeRole={setRole} />

      {displayError && (
        <div
          className="flex items-center gap-2 p-3 rounded-input text-xs sm:text-sm font-medium mb-4 bg-red-50 border border-red-200 text-red-700 animate-fadeIn"
          role="alert"
        >
          <span>⚠️</span>
          <span>{displayError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <AuthInput
          label="Full Name"
          id="register-name"
          type="text"
          placeholder="e.g. Alex Morgan"
          value={name}
          onChange={handleInputChange(setName)}
          icon={User}
          autoComplete="name"
          required
        />

        <AuthInput
          label="Email Address"
          id="register-email"
          type="email"
          placeholder="e.g. alex@fooddash.com"
          value={email}
          onChange={handleInputChange(setEmail)}
          icon={Mail}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          id="register-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={handleInputChange(setPassword)}
          icon={Lock}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          id="register-confirm-password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={handleInputChange(setConfirmPassword)}
          icon={ShieldCheck}
          autoComplete="new-password"
          required
        />

        <AuthButton loading={loading} disabled={loading}>
          <span>{loading ? 'Creating account...' : 'Create Account'}</span>
          {!loading && <ArrowRight size={18} />}
        </AuthButton>
      </form>

      <AuthFooter mode="register" onToggleMode={onToggleMode} />
    </AuthCard>
  );
}
