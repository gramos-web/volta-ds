import React from 'react'
import styled, { css } from 'styled-components'
import { color, radius, typography } from '../../tokens'

// ── Type styles ───────────────────────────────────────────────────────────────
const typeStyles = {
  brand: css`
    background: ${color.brand[50]};
    border-color: ${color.brand[100]};
    color: ${color.brand[800]};
    --dot-color: ${color.brand[600]};
  `,
  success: css`
    background: ${color.success[50]};
    border-color: ${color.success[600]};
    color: ${color.success[800]};
    --dot-color: ${color.success[600]};
  `,
  error: css`
    background: ${color.error[50]};
    border-color: ${color.error[600]};
    color: ${color.error[800]};
    --dot-color: ${color.error[600]};
  `,
  warning: css`
    background: ${color.warning[50]};
    border-color: ${color.warning[600]};
    color: ${color.warning[800]};
    --dot-color: ${color.warning[600]};
  `,
  neutral: css`
    background: ${color.neutral[100]};
    border-color: ${color.neutral[200]};
    color: ${color.neutral[600]};
    --dot-color: ${color.neutral[400]};
  `,
  dark: css`
    background: ${color.neutral[900]};
    border-color: ${color.neutral[900]};
    color: #ffffff;
    --dot-color: #ffffff;
  `,
}

// ── Size styles ───────────────────────────────────────────────────────────────
const sizeStyles = {
  sm: css`
    height: 20px;
    padding: 0 6px;
    font-size: 10px;
    gap: 4px;
  `,
  md: css`
    height: 24px;
    padding: 0 8px;
    font-size: ${typography.size.caption};
    gap: 6px;
  `,
  lg: css`
    height: 28px;
    padding: 0 10px;
    font-size: ${typography.size.label};
    gap: 6px;
  `,
}

// ── Styled pieces ─────────────────────────────────────────────────────────────
const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: ${radius.full};
  font-family: ${typography.family};
  font-weight: ${typography.weight.semiBold};
  white-space: nowrap;
  line-height: 1;

  ${({ $type }) => typeStyles[$type] || typeStyles.brand}
  ${({ $size }) => sizeStyles[$size] || sizeStyles.md}
`

const Dot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot-color);
  flex-shrink: 0;
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: currentColor;
  opacity: 0.6;
  flex-shrink: 0;
  border-radius: 2px;

  &:hover { opacity: 1; }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// Badge component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Badge — Volta DS
 * Max 2 words, sentence case, no punctuation.
 *
 * @param {'brand'|'success'|'error'|'warning'|'neutral'|'dark'} type
 * @param {'sm'|'md'|'lg'} size
 * @param {string} label       - Max 2 words, sentence case.
 * @param {boolean} hasDot     - Color dot before label (for status badges).
 * @param {function} onRemove  - If provided, renders ✕ (Tag mode).
 */
export function Badge({
  type = 'brand',
  size = 'md',
  label,
  hasDot = false,
  onRemove,
  ...props
}) {
  return (
    <StyledBadge $type={type} $size={size} {...props}>
      {hasDot && <Dot aria-hidden="true" />}
      <span>{label}</span>
      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          aria-label={`Eliminar ${label}`}
          type="button"
        >
          ✕
        </RemoveButton>
      )}
    </StyledBadge>
  )
}

// Tag is Badge with onRemove — same component, different usage
export const Tag = ({ label, onRemove, ...props }) => (
  <Badge label={label} onRemove={onRemove} {...props} />
)

export default Badge
