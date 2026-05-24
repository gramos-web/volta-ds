import React, { useState, useId } from 'react'
import styled, { css } from 'styled-components'
import { c, spacing, radius, typography } from '../../tokens'

// ── State styles ──────────────────────────────────────────────────────────────
const fieldStates = {
  default: css`
    border-color: ${c.border.default};
    background: ${c.surface.secondary};
  `,
  focus: css`
    border-color: ${c.action.focus};
    border-width: 2px;
    background: ${c.surface.primary};
  `,
  filled: css`
    border-color: ${c.border.default};
    background: ${c.surface.primary};
  `,
  error: css`
    border-color: ${c.feedback.error};
    border-width: 1.5px;
    background: #fef2f2;
  `,
  disabled: css`
    border-color: ${c.border.default};
    background: ${c.surface.tertiary};
    opacity: 0.5;
    cursor: not-allowed;
  `,
}

// ── Styled pieces ─────────────────────────────────────────────────────────────
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  width: 100%;
`

const Label = styled.label`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  font-weight: ${typography.weight.semiBold};
  color: ${({ $state }) =>
    $state === 'error'    ? c.feedback.error :
    $state === 'focus'    ? c.action.primary :
    $state === 'disabled' ? c.text.muted :
    c.text.secondary};
  line-height: ${typography.lineHeight.normal};
`

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  font-weight: ${typography.weight.regular};
  color: ${c.text.primary};
  border: 1px solid;
  border-radius: ${radius.md};
  padding: 0 ${spacing[4]};
  padding-left: ${({ $hasIcon }) => $hasIcon ? spacing[10] : spacing[4]};
  outline: none;
  transition: border-color 150ms ease, background 150ms ease;

  ${({ $state }) => fieldStates[$state] || fieldStates.default}

  &::placeholder {
    color: ${c.text.muted};
  }
  &:focus-visible {
    outline: none; /* handled via $state=focus */
  }
  &:disabled {
    cursor: not-allowed;
  }
`

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  font-weight: ${typography.weight.regular};
  color: ${c.text.primary};
  border: 1px solid;
  border-radius: ${radius.md};
  padding: ${spacing[3]} ${spacing[4]};
  outline: none;
  resize: vertical;
  transition: border-color 150ms ease, background 150ms ease;
  line-height: ${typography.lineHeight.normal};

  ${({ $state }) => fieldStates[$state] || fieldStates.default}

  &::placeholder { color: ${c.text.muted}; }
`

const IconLeft = styled.span`
  position: absolute;
  left: ${spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${c.text.muted};
  pointer-events: none;
`

const HelperText = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  font-weight: ${typography.weight.regular};
  color: ${({ $isError }) => $isError ? c.feedback.error : c.text.muted};
  margin: 0;
  line-height: ${typography.lineHeight.normal};
`

// ─────────────────────────────────────────────────────────────────────────────
// Input component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Input — Volta DS
 *
 * @param {string}  label        - Always visible above the field. Required.
 * @param {string}  placeholder  - Shows expected format, never instructions.
 * @param {string}  value
 * @param {'text'|'email'|'password'|'search'|'number'} type
 * @param {string}  error        - Error message: what happened + how to fix it.
 * @param {string}  helperText   - Describes the requirement, not just "valid".
 * @param {boolean} required
 * @param {boolean} disabled
 * @param {React.ReactNode} iconLeft
 * @param {function} onChange
 * @param {function} onBlur      - Validation runs on blur, never on keypress.
 */
export function Input({
  label,
  placeholder,
  value,
  type = 'text',
  error,
  helperText,
  required = false,
  disabled = false,
  iconLeft,
  onChange,
  onBlur,
  id: externalId,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)
  const autoId = useId()
  const id = externalId || autoId
  const helperId = `${id}-helper`

  const state = disabled ? 'disabled'
    : error ? 'error'
    : isFocused ? 'focus'
    : value ? 'filled'
    : 'default'

  const sharedProps = {
    id,
    placeholder,
    value,
    disabled,
    $state: state,
    $hasIcon: !!iconLeft,
    onChange,
    onBlur: (e) => { setIsFocused(false); onBlur?.(e) },
    onFocus: () => setIsFocused(true),
    'aria-required': required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': (error || helperText) ? helperId : undefined,
    ...props
  }

  return (
    <Wrapper>
      {label && (
        <Label htmlFor={id} $state={state}>
          {label}{required && ' *'}
        </Label>
      )}
      <FieldWrapper>
        {iconLeft && <IconLeft aria-hidden="true">{iconLeft}</IconLeft>}
        {type === 'textarea'
          ? <StyledTextarea {...sharedProps} />
          : <StyledInput type={type} {...sharedProps} />
        }
      </FieldWrapper>
      {(error || helperText) && (
        <HelperText id={helperId} $isError={!!error} role={error ? 'alert' : undefined}>
          {error || helperText}
        </HelperText>
      )}
    </Wrapper>
  )
}

export default Input
