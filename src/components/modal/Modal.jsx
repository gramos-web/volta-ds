import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { c, spacing, radius, shadow, typography } from '../../tokens'

// ── Styled pieces ─────────────────────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing[6]};
`

const Dialog = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.lg};
  width: 100%;
  max-width: 520px;
  max-height: calc(100vh - ${spacing[12]});
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.div`
  padding: ${spacing[8]} ${spacing[8]} ${spacing[4]};
`

const Title = styled.h2`
  font-family: ${typography.family};
  font-size: ${typography.size.h4};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
  margin: 0 0 ${spacing[2]};
  line-height: ${typography.lineHeight.tight};
`

const Description = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  font-weight: ${typography.weight.regular};
  color: ${c.text.secondary};
  margin: 0;
  line-height: ${typography.lineHeight.normal};
`

const Body = styled.div`
  padding: 0 ${spacing[8]};
  overflow-y: auto;
  flex: 1;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${c.border.default};
  margin: 0;
`

const Footer = styled.div`
  padding: ${spacing[4]} ${spacing[8]};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing[3]};
`

// ─────────────────────────────────────────────────────────────────────────────
// Modal component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Modal — Volta DS
 *
 * @param {boolean} open
 * @param {function} onClose     - Called on overlay click and Esc key.
 * @param {string} title
 * @param {string} [description]
 * @param {React.ReactNode} children  - Body content.
 * @param {React.ReactNode} footer    - Use <Modal.Footer> slot or pass directly.
 *
 * Rules:
 * - Max 2 actions in footer: primary (right) + cancel (left)
 * - Title describes the consequence, not a question
 * - Esc always closes (except when loading — handle in parent)
 */
export function Modal({ open, onClose, title, description, children, footer }) {
  const dialogRef = useRef(null)

  // Esc to close
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Focus trap & scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    dialogRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <Overlay
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      role="presentation"
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <Header>
          <Title id="modal-title">{title}</Title>
          {description && <Description>{description}</Description>}
        </Header>

        {children && (
          <>
            <Body>{children}</Body>
          </>
        )}

        {footer && (
          <>
            <Divider />
            <Footer>{footer}</Footer>
          </>
        )}
      </Dialog>
    </Overlay>,
    document.body
  )
}

// Convenience sub-component for the footer slot
Modal.Footer = Footer

export default Modal
