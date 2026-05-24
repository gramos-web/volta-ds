import React from 'react'
import styled from 'styled-components'
import { c, spacing, radius, shadow, typography } from '../../tokens'

// ── Styled pieces ─────────────────────────────────────────────────────────────
const CardRoot = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.none};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 150ms ease;

  &:hover {
    box-shadow: ${({ $interactive }) => $interactive ? shadow.sm : shadow.none};
  }
`

const CardMedia = styled.div`
  width: 100%;
  height: ${({ $height }) => $height || '160px'};
  overflow: hidden;
  flex-shrink: 0;
  background: ${c.surface.tertiary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const CardHeader = styled.div`
  padding: ${spacing[5]};
  padding-bottom: ${spacing[3]};
`

const CardHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[2]};
`

const CardTitle = styled.h3`
  font-family: ${typography.family};
  font-size: ${({ $compact }) => $compact ? typography.size.bodySm : typography.size.h5};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
  margin: 0;
  line-height: ${typography.lineHeight.tight};
`

const CardMeta = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  font-weight: ${typography.weight.regular};
  color: ${c.text.muted};
  margin: ${spacing[1]} 0 0;
  line-height: ${typography.lineHeight.normal};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${c.border.default};
  margin: 0;
`

const CardBodyArea = styled.div`
  padding: ${spacing[5]};
  padding-top: ${spacing[3]};
  flex: 1;
`

const CardFooterArea = styled.div`
  padding: ${spacing[4]} ${spacing[5]};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing[2]};
  border-top: 1px solid ${c.border.default};
  margin-top: auto;
`

// ─────────────────────────────────────────────────────────────────────────────
// Card component with sub-components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Card — Volta DS
 *
 * @param {boolean} interactive  - Adds hover shadow.
 *
 * Compose with:
 *   <Card.Media src="..." alt="..." />
 *   <Card.Header title="..." meta="..." badge={<Badge />} compact />
 *   <Card.Body>...</Card.Body>
 *   <Card.Footer>...</Card.Footer>
 *
 * Rules:
 * - Omit zones with no content
 * - Footer: max 2 actions
 * - All cards in same grid must have same min-height
 */
export function Card({ children, interactive = false, ...props }) {
  return (
    <CardRoot $interactive={interactive} {...props}>
      {children}
    </CardRoot>
  )
}

Card.Media = function Media({ src, alt, height }) {
  return (
    <CardMedia $height={height}>
      {src
        ? <img src={src} alt={alt || ''} loading="lazy" />
        : null
      }
    </CardMedia>
  )
}

Card.Header = function Header({ title, meta, badge, compact = false }) {
  return (
    <CardHeader>
      <CardHeaderRow>
        <CardTitle $compact={compact}>{title}</CardTitle>
        {badge}
      </CardHeaderRow>
      {meta && <CardMeta>{meta}</CardMeta>}
    </CardHeader>
  )
}

Card.Body = function Body({ children }) {
  return (
    <>
      <Divider />
      <CardBodyArea>{children}</CardBodyArea>
    </>
  )
}

Card.Footer = function Footer({ children }) {
  return <CardFooterArea>{children}</CardFooterArea>
}

export default Card
