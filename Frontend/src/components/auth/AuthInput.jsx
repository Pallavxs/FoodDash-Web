import React from 'react';
import Input from '../common/Input';

/**
 * AuthInput:
 * Authentication-specific text/email input wrapped around the common Input.
 */
export default function AuthInput({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  autoComplete,
  error,
}) {
  return (
    <Input
      label={label}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      icon={icon}
      required={required}
      autoComplete={autoComplete}
      error={error}
    />
  );
}
