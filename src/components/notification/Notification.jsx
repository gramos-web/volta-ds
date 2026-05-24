import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { color, c, spacing, radius, shadow, typography } from '../../tokens'

// ── Type styles ───────────────────────────────────────────────────────────────
const typeMap = {
  success: {
    bg:     color.success[50],
    border: color.success[600],
    dot:    color.success[600],
    text:   color.success[800],
  },
  error: {
    bg:     color.error[50],
    border: color.error[600],
    dot:    color.error[600],
    text:   color.error[800],
  },
  warning: {
    bg:     color.warning[50],
    border: color.warning[600],
    dot:    color.warning[600],
    text:   color.warning[800],
  },
  info: {
    bg:     color.brand[50],
    border: color.brand[600],
    dot:    color.brand[600],
    text:   color.brand[800],
  },
}

// ── Toast animation ───────────────────────────────────────────────────────────
const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`

// ── Styled pieces ─────────────────────────────────────────────────────────────
const ToastRoot = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${({ $type }) => typeMap[$type]?.bg};
  border: 1px solid ${({ $type }) => typeMap[$type]?.border};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.xl};
  color: ${({ $type }) => typeMap[$type]?.text};
  animation: ${slideIn} 250ms ease-out;
  max-width: 400px;
  width: 100%;
`

const BannerRoot = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${({ $type }) => typeMap[$type]?.bg};
  border: 1px solid ${({ $type }) => typeMap[$type]?.border};
  color: ${({ $type }) => typeMap[$type]?.text};
  width: 100%;
`

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $type }) => typeMap[$type]?.dot};
  flex-shrink: 0;
  margin-top: 3px;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  font-weight: ${typography.weight.semiBold};
  margin: 0;
  line-height: ${typography.lineHeight.normal};
`

const Desc = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  font-weight: ${typography.weight.regular};
  margin: ${spacing[1]} 0 0;
  line-height: ${typography.lineHeight.normal};
`

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  font-weight: ${typography.weight.semiBold};
  color: inherit;
  padding: 0;
  text-decoration: underline;
  flex-shrink: 0;
  &:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: inherit;
  opacity: 0.5;
  padding: 0;
  flex-shrink: 0;
  line-height: 1;
  &:hover { opacity: 1; }
  &:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`

// ── Shared inner content ──────────────────────────────────────────────────────
function NotifContent({ type, title, description, action, onClose }) {
  return (
    <>
      <Dot $type={type} aria-hidden="true" />
      <Content>
        <Title>{title}</Title>
        {description && <Desc>{description}</Desc>}
      </Content>
      {action && (
        <ActionButton onClick={action.onClick} type="button">
          {action.label}
        </ActionButton>
      )}
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Cerrar notificación" type="button">
          ✕
        </CloseButton>
      )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast — ephemeral, floating, corner
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Toast — Volta DS
 * Position with ToastContainer (fixed bottom-right).
 *
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} title       - What happened + entity affected.
 * @param {string} [description]
 * @param {{ label: string, onClick: function }} [action]
 * @param {function} onClose
 */
export function Toast({ type = 'success', title, description, action, onClose }) {
  return (
    <ToastRoot $type={type} role="status" aria-live="polite">
      <NotifContent type={type} title={title} description={description} action={action} onClose={onClose} />
    </ToastRoot>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Banner — persistent, inline
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Banner — Volta DS
 * Place at the top of the content area it relates to.
 *
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} title
 * @param {string} [description]
 * @param {{ label: string, onClick: function }} [action]
 * @param {function} onClose
 */
export function Banner({ type = 'info', title, description, action, onClose }) {
  return (
    <BannerRoot $type={type} role="alert">
      <NotifContent type={type} title={title} description={description} action={action} onClose={onClose} />
    </BannerRoot>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ToastContainer — fixed bottom-right, stacks toasts
// ─────────────────────────────────────────────────────────────────────────────
const Container = styled.div`
  position: fixed;
  bottom: ${spacing[6]};
  right: ${spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  z-index: 2000;
  pointer-events: none;
  & > * { pointer-events: auto; }
`

export function ToastContainer({ children }) {
  return <Container>{children}</Container>
}

export default Toast
