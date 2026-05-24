import React from 'react'
import styled from 'styled-components'
import { c, spacing, radius, typography } from '../../../volta-ds/tokens'
import { Badge } from '../../../volta-ds/components/badge/Badge'
import { Button } from '../../../volta-ds/components/button/Button'

const barFgColors = { success: c.feedback.success, warning: c.feedback.warning, error: c.feedback.error, neutral: '#A3A3A0' }

const Card = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`
const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[2]};
`
const Name = styled.h3`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
  margin: 0;
  flex: 1;
`
const Employees = styled.span`
  font-size: ${typography.size.caption};
  color: ${c.text.muted};
  white-space: nowrap;
  flex-shrink: 0;
`
const Amount = styled.p`
  font-family: ${typography.family};
  font-size: 22px;
  font-weight: ${typography.weight.bold};
  color: ${c.text.primary};
  margin: 0;
`
const BudgetRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const BudgetText = styled.span`
  font-size: ${typography.size.caption};
  color: ${c.text.muted};
`
const BarBg = styled.div`
  height: 4px;
  background: ${c.surface.tertiary};
  border-radius: 2px;
  overflow: hidden;
`
const BarFg = styled.div`
  height: 100%;
  border-radius: 2px;
  background: ${({ $type }) => barFgColors[$type] || c.action.primary};
  width: ${({ $pct }) => Math.max(2, $pct)}%;
  transition: width 600ms ease;
`

export function CategoryCard({ name, amount, budget, pct, badgeType, badgeLabel, employees, onView }) {
  return (
    <Card>
      <TopRow>
        <Name>{name}</Name>
        <Employees>{employees} empleados</Employees>
      </TopRow>
      <Badge type={badgeType} label={badgeLabel} size="sm" hasDot />
      <Amount>{amount}</Amount>
      <BudgetRow>
        <BudgetText>de {budget}</BudgetText>
        <Button variant="ghost" size="sm" onClick={onView}>Ver detalle</Button>
      </BudgetRow>
      <BarBg><BarFg $type={badgeType} $pct={pct} /></BarBg>
    </Card>
  )
}
