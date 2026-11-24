import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import AccountTypeSelector from '../../components/auth/AccountTypeSelector';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthFooter from '../../components/auth/AuthFooter';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../../redux/slice/authSlice';

export default function Login({ onToggleMode, onSuccess }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (onSuccess && result?.user) {
        onSuccess(result.user);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <AuthCard mode="login">
      <AuthHeader mode="login" />

      <AccountTypeSelector role={role} onChangeRole={setRole} />

      {error && (
        <div
          className="flex items-center gap-2 p-3 rounded-input text-xs sm:text-sm font-medium mb-4 bg-red-50 border border-red-200 text-red-700 animate-fadeIn"
          role="alert"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <AuthInput
          label="Email Address"
          id="login-email"
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
          id="login-password"
          placeholder="Your secret password"
          value={password}
          onChange={handleInputChange(setPassword)}
          icon={Lock}
          autoComplete="current-password"
          required
        />

        <div className="flex justify-end -mt-1.5 mb-4">
          <span
            className="text-xs font-semibold text-primary hover:underline underline-offset-2 transition-opacity cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        <AuthButton loading={loading} disabled={loading}>
          <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          {!loading && <ArrowRight size={18} />}
        </AuthButton>
      </form>

      <AuthFooter mode="login" onToggleMode={onToggleMode} />
    </AuthCard>
  );
}
