import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '../common/Input';

/**
 * PasswordInput:
 * Reusable password input with left security icon and toggleable visibility icon.
 */
export default function PasswordInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  autoComplete,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleButton = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      className="p-1 text-[#8E857C] hover:text-primary transition-colors cursor-pointer outline-none flex items-center justify-center"
    >
      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
    </button>
  );

  return (
    <Input
      label={label}
      id={id}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      icon={icon}
      required={required}
      autoComplete={autoComplete}
      error={error}
      rightElement={toggleButton}
    />
  );
}
