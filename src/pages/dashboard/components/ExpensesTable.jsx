import React from 'react'
import styled from 'styled-components'
import { c, spacing, radius, typography } from '../../../volta-ds/tokens'
import { Badge } from '../../../volta-ds/components/badge/Badge'
import { Button } from '../../../volta-ds/components/button/Button'

const Wrapper = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  overflow: hidden;
`
const THead = styled.div`
  display: grid;
  grid-template-columns: 240px 160px 1fr 120px 140px;
  background: ${c.surface.tertiary};
  padding: 0 ${spacing[6]};
  height: 40px;
  align-items: center;
`
const TH = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.muted};
`
const TRow = styled.div`
  display: grid;
  grid-template-columns: 240px 160px 1fr 120px 140px;
  padding: 0 ${spacing[6]};
  height: 48px;
  align-items: center;
  background: ${({ $odd }) => $odd ? c.surface.secondary : c.surface.primary};
  border-top: 1px solid ${c.border.default};
`
const EmployeeCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`
const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${c.action.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.family};
  font-size: 10px;
  font-weight: ${typography.weight.bold};
  color: white;
  flex-shrink: 0;
`
const EmployeeName = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  font-weight: ${typography.weight.medium};
  color: ${c.text.primary};
`
const Cell = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  color: ${c.text.secondary};
`
const AmountCell = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing[6]};
  height: 48px;
  border-top: 1px solid ${c.border.default};
`
const FooterText = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  color: ${c.text.muted};
`

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2)
}

export function ExpensesTable({ expenses, total, onViewAll }) {
  return (
    <Wrapper>
      <THead>
        <TH>Empleado</TH>
        <TH>Categoría</TH>
        <TH>Descripción</TH>
        <TH>Monto</TH>
        <TH>Estado</TH>
      </THead>
      {expenses.map((exp, i) => (
        <TRow key={exp.id} $odd={i % 2 !== 0}>
          <EmployeeCell>
            <Avatar>{getInitials(exp.employee)}</Avatar>
            <EmployeeName>{exp.employee}</EmployeeName>
          </EmployeeCell>
          <Cell>{exp.category}</Cell>
          <Cell>{exp.description}</Cell>
          <AmountCell>{exp.amount}</AmountCell>
          <Badge type={exp.status} label={exp.statusLabel} size="sm" hasDot />
        </TRow>
      ))}
      <Footer>
        <FooterText>Mostrando {expenses.length} de {total} gastos</FooterText>
        <Button variant="ghost" size="sm" onClick={onViewAll}>Ver todos los gastos</Button>
      </Footer>
    </Wrapper>
  )
}
