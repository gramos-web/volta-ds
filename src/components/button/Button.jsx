import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { c, spacing, radius, typography } from '../../tokens'

// ── Spinner ──────────────────────────────────────────────────────────────────
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`

// ── Variant styles ────────────────────────────────────────────────────────────
const variants = {
  primary: css`
    background: ${c.action.primary};
    color: ${c.text.onPrimary};
    border: none;
    &:hover:not(:disabled) { background: ${c.action.primaryHover}; }
  `,
  secondary: css`
    background: ${c.surface.primary};
    color: ${c.text.primary};
    border: 1.5px solid ${c.border.default};
    &:hover:not(:disabled) { background: ${c.surface.secondary}; }
  `,
  ghost: css`
    background: transparent;
    color: ${c.action.primary};
    border: none;
    &:hover:not(:disabled) { background: ${c.surface.secondary}; }
  `,
  danger: css`
    background: ${c.feedback.error};
    color: ${c.text.onPrimary};
    border: none;
    &:hover:not(:disabled) { background: #b91c1c; }
  `,
}

// ── Size styles ───────────────────────────────────────────────────────────────
const sizes = {
  sm: css`
    height: 32px;
    padding: 0 ${spacing[3]};
    font-size: ${typography.size.label};
    gap: ${spacing[1]};
  `,
  md: css`
    height: 44px;
    padding: 0 ${spacing[5]};
    font-size: ${typography.size.body};
    gap: ${spacing[2]};
  `,
  lg: css`
    height: 52px;
    padding: 0 ${spacing[7]};
    font-size: ${typography.size.h5};
    gap: ${spacing[2]};
  `,
}

// ── Styled root ───────────────────────────────────────────────────────────────
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.family};
  font-weight: ${typography.weight.semiBold};
  border-radius: ${radius.md};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease-out, box-shadow 150ms ease-out;
  text-decoration: none;
  line-height: 1;

  /* Variant */
  ${({ $variant }) => variants[$variant] || variants.primary}

  /* Size */
  ${({ $size }) => sizes[$size] || sizes.md}

  /* Focus ring */
  &:focus-visible {
    outline: 2px solid ${c.action.focus};
    outline-offset: 2px;
  }

  /* Disabled */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

// ── Icon wrapper ──────────────────────────────────────────────────────────────
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`

// ─────────────────────────────────────────────────────────────────────────────
// Button component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Button — Volta DS
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading   - Shows spinner, disables interaction, fixes width
 * @param {boolean} disabled
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 * @param {string} [aria-label]  - Required for icon-only buttons
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  ...props
}) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner aria-hidden="true" />}
      {!loading && iconLeft && <IconWrapper aria-hidden="true">{iconLeft}</IconWrapper>}
      {children && <span>{children}</span>}
      {!loading && iconRight && <IconWrapper aria-hidden="true">{iconRight}</IconWrapper>}
    </StyledButton>
  )
}

export default Button
