import React from 'react'
import styled from 'styled-components'
import { c, spacing, radius, typography } from '../../../volta-ds/tokens'

const accentColors = {
  total:     c.action.primary,
  budget:    c.feedback.success,
  pending:   c.feedback.error,
  employees: c.feedback.success,
}
const trendBg = { success: '#ECFDF5', warning: '#FFFBEB', error: '#FEF2F2' }
const trendTc = { success: '#065F46', warning: '#92400E', error: '#991B1B' }
const barColors = {
  total:     c.action.primary,
  budget:    c.feedback.success,
  pending:   c.feedback.error,
  employees: c.feedback.success,
}

const Card = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  overflow: hidden;
  flex: 1;
`
const Accent = styled.div`
  height: 4px;
  background: ${({ $id }) => accentColors[$id] || c.action.primary};
`
const Body = styled.div`
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`
const Label = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.muted};
  margin: 0;
`
const Value = styled.p`
  font-family: ${typography.family};
  font-size: 26px;
  font-weight: ${typography.weight.bold};
  color: ${c.text.primary};
  margin: 0;
  line-height: 1.1;
`
const Sub = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  color: ${c.text.muted};
  margin: 0;
`
const BarBg = styled.div`
  height: 6px;
  background: ${c.surface.tertiary};
  border-radius: 3px;
  margin-top: ${spacing[2]};
  overflow: hidden;
`
const BarFg = styled.div`
  height: 100%;
  border-radius: 3px;
  background: ${({ $id }) => barColors[$id] || c.action.primary};
  width: ${({ $pct }) => Math.max(2, $pct * 100)}%;
  transition: width 600ms ease;
`
const Trend = styled.p`
  font-family: ${typography.family};
  font-size: 10px;
  color: ${({ $type }) => trendTc[$type]};
  background: ${({ $type }) => trendBg[$type]};
  border-radius: ${radius.sm};
  padding: 2px 6px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export function StatCard({ id, label, value, sub, trend, trendType, progress }) {
  return (
    <Card>
      <Accent $id={id} />
      <Body>
        <Label>{label}</Label>
        <Value>{value}</Value>
        <Sub>{sub}</Sub>
        <BarBg><BarFg $id={id} $pct={progress} /></BarBg>
        <Trend $type={trendType}>{trend}</Trend>
      </Body>
    </Card>
  )
}
