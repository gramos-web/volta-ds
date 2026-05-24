import React, { useState, useId, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { c, spacing, radius, typography } from '../../tokens'

// ── Chevron ───────────────────────────────────────────────────────────────────
const ChevronIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 200ms ease;
  transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  color: ${({ $expanded }) => $expanded ? c.action.primary : c.text.muted};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

// ── Content animation ─────────────────────────────────────────────────────────
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ── Variant styles ────────────────────────────────────────────────────────────
const variantTrigger = {
  default: css`background: ${c.surface.primary};`,
  filled:  css`background: ${c.surface.secondary};`,
  ghost:   css`background: transparent;`,
}

// ── Styled pieces ─────────────────────────────────────────────────────────────
const Item = styled.div`
  border: 1px solid ${({ $expanded }) => $expanded ? c.action.primary : c.border.default};
  border-radius: ${radius.md};
  overflow: hidden;
  transition: border-color 150ms ease;

  /* Inside a group — share borders between items */
  .accordion-group & {
    border-radius: 0;
    border-top: none;

    &:first-child {
      border-radius: ${radius.md} ${radius.md} 0 0;
      border-top: 1px solid ${({ $expanded }) => $expanded ? c.action.primary : c.border.default};
    }
    &:last-child {
      border-radius: 0 0 ${radius.md} ${radius.md};
    }
  }

  &:focus-within {
    outline: none;
  }

  opacity: ${({ $disabled }) => $disabled ? 0.45 : 1};
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'auto'};
`

const Trigger = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[2]};
  padding: 0 ${spacing[5]};
  border: none;
  cursor: pointer;
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  font-weight: ${typography.weight.semiBold};
  color: ${({ $expanded }) => $expanded ? c.action.primary : c.text.primary};
  text-align: left;
  transition: color 150ms ease, background 150ms ease;

  ${({ $variant }) => variantTrigger[$variant] || variantTrigger.default}

  &:hover:not(:disabled) {
    background: ${c.surface.tertiary};
  }

  &:focus-visible {
    outline: 2px solid ${c.action.focus};
    outline-offset: -2px;
  }
`

const TriggerLeft = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  flex: 1;
  min-width: 0;
`

const TitleText = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Divider = styled.div`
  height: 1px;
  background: ${c.border.default};
  margin: 0;
`

const Content = styled.div`
  padding: ${spacing[4]} ${spacing[5]};
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  font-weight: ${typography.weight.regular};
  color: ${c.text.secondary};
  line-height: ${typography.lineHeight.normal};
  animation: ${slideDown} 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// Accordion — single item
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Accordion — Volta DS
 *
 * @param {string} title          - Max 60 chars. FAQ: question format. Settings: noun.
 * @param {React.ReactNode} badge - Optional Badge component in the header.
 * @param {'default'|'filled'|'ghost'} variant
 * @param {boolean} disabled
 * @param {boolean} [defaultOpen]
 * @param {boolean} [open]         - Controlled mode.
 * @param {function} [onToggle]    - Controlled mode callback.
 * @param {React.ReactNode} children - Body content.
 */
export function Accordion({
  title,
  badge,
  variant = 'default',
  disabled = false,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  children,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const panelId = useId()
  const triggerId = useId()

  function handleToggle() {
    if (disabled) return
    if (isControlled) {
      onToggle?.(!isOpen)
    } else {
      setInternalOpen(prev => !prev)
    }
  }

  return (
    <Item $expanded={isOpen} $disabled={disabled}>
      <Trigger
        id={triggerId}
        $expanded={isOpen}
        $variant={variant}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        onClick={handleToggle}
        type="button"
      >
        <TriggerLeft>
          <TitleText>{title}</TitleText>
          {badge}
        </TriggerLeft>
        <ChevronIcon $expanded={isOpen} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6l5 5 5-5" />
          </svg>
        </ChevronIcon>
      </Trigger>

      {isOpen && (
        <>
          <Divider />
          <Content
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
          >
            {children}
          </Content>
        </>
      )}
    </Item>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AccordionGroup — manages single/multi expand behavior
// ─────────────────────────────────────────────────────────────────────────────
const Group = styled.div`
  display: flex;
  flex-direction: column;
`

/**
 * AccordionGroup — Volta DS
 *
 * Wraps multiple Accordion items. Manages shared borders and expand behavior.
 *
 * @param {boolean} multiExpand  - Allow multiple items open. Default: false (single-expand).
 * @param {'default'|'filled'|'ghost'} variant - Passed to all children.
 */
export function AccordionGroup({ children, multiExpand = false, variant = 'default' }) {
  const [openItems, setOpenItems] = useState(new Set())

  function handleToggle(index, isOpen) {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (isOpen) {
        if (!multiExpand) next.clear()
        next.add(index)
      } else {
        next.delete(index)
      }
      return next
    })
  }

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child, {
      variant: child.props.variant || variant,
      open: openItems.has(index),
      onToggle: (isOpen) => handleToggle(index, isOpen),
    })
  })

  return <Group className="accordion-group">{items}</Group>
}

export default Accordion
