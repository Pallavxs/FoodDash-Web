import React from 'react';
import Button from '../common/Button';

/**
 * AuthButton:
 * Primary CTA button for authentication actions.
 */
export default function AuthButton({
  children,
  type = 'submit',
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <Button
      type={type}
      variant="primary"
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className="mt-2"
    >
      {children}
    </Button>
  );
}
