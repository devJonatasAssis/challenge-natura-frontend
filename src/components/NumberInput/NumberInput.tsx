'use client';

import React from 'react';
import { TextField } from '@mui/material';
import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  maxLength: number;
  register: UseFormRegister<T>;
  label: string;
  error?: FieldError | any;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'standard' | 'outlined';
  fontSizeLabel?: number | string;
  defaultValue?: string;
  onBlur?: () => void;
}

function maskNumberInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  let { value } = e.target;
  value = value.replace(/\D/g, '');
  e.target.value = value;
  return e;
}

export function NumberInput<TFieldValues extends FieldValues>({
  name,
  label,
  maxLength,
  register,
  error,
  required = false,
  autoFocus,
  disabled = false,
  variant = 'filled',
  fontSizeLabel,
  defaultValue,
  onBlur,
}: Props<TFieldValues>) {
  const { onChange, ...rest } = register(name);
  return (
    <TextField
      label={label}
      variant={variant}
      autoFocus={autoFocus}
      disabled={disabled}
      {...rest}
      required={required}
      error={!!error}
      helperText={error?.message}
      onChange={(e) => onChange(maskNumberInput(e))}
      inputProps={{
        maxLength,
      }}
      InputLabelProps={{
        sx: { fontSize: fontSizeLabel },
      }}
      defaultValue={defaultValue}
      onBlur={onBlur}
    />
  );
}
