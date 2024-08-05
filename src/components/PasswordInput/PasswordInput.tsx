'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { MouseEvent } from 'react';
import React, { useState } from 'react';
import type { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error: any;
  required?: boolean;
  label?: string;
  handleKeyUp?: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onPaste?: React.ClipboardEventHandler<HTMLDivElement>;
  autoFocus?: boolean;
  autoComplete: string;
}

export function PasswordInput<TFieldValues extends FieldValues>({
  name,
  register,
  error,
  handleKeyUp = () => null,
  onPaste = () => null,
  required = false,
  label = 'Senha',
  autoFocus,
  autoComplete
}: Props<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      label={label}
      {...register(name)}
      fullWidth
      required={required}
      type={showPassword ? 'text' : 'password'}
      error={!!error}
      helperText={error?.message}
      onPaste={onPaste}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      inputProps={{ maxLength: 255 }}
      InputProps={{
        onKeyUp: (e) => handleKeyUp(e),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
