import React, { useState } from 'react'
import styled from 'styled-components'
import { c, spacing, typography, shadow } from '../../volta-ds/tokens'
import { Button } from '../../volta-ds/components/button/Button'
import { Toast, ToastContainer } from '../../volta-ds/components/notification/Notification'
import { StatCard }      from './components/StatCard'
import { CategoryCard }  from './components/CategoryCard'
import { ExpensesTable } from './components/ExpensesTable'
import { ExpenseForm }   from './components/ExpenseForm'
import {
  statCards, categories, recentExpenses, employees, categoryOptions
} from './data/expenses'

// ── Layout ────────────────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  background: ${c.surface.secondary};
`
const Topbar = styled.header`
  background: ${c.surface.primary};
  border-bottom: 1px solid ${c.border.default};
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 ${spacing[16]};
  gap: ${spacing[10]};
  position: sticky;
  top: 0;
  z-index: 100;
`
const Logo = styled.span`
  font-family: ${typography.family};
  font-size: ${typography.size.h5};
  font-weight: ${typography.weight.bold};
  color: ${c.action.primary};
`
const LogoSub = styled.span`
  font-weight: ${typography.weight.regular};
  color: ${c.text.muted};
`
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing[8]};
  flex: 1;
`
const NavItem = styled.button`
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  font-weight: ${({ $active }) => $active ? typography.weight.semiBold : typography.weight.regular};
  color: ${({ $active }) => $active ? c.action.primary : c.text.secondary};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => $active ? c.action.primary : 'transparent'};
  padding: 0 0 2px;
  cursor: pointer;
  height: 64px;
  transition: color 150ms ease;
  &:hover { color: ${c.text.primary}; }
`
const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${c.action.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.family};
  font-size: 11px;
  font-weight: ${typography.weight.bold};
  color: white;
  cursor: pointer;
  flex-shrink: 0;
`
const Main = styled.main`
  padding: ${spacing[8]} ${spacing[16]};
  max-width: 1440px;
  margin: 0 auto;
`
const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${spacing[6]};
`
const PageTitle = styled.h1`
  font-family: ${typography.family};
  font-size: ${typography.size.h2};
  font-weight: ${typography.weight.bold};
  color: ${c.text.primary};
  margin: 0 0 ${spacing[1]};
`
const PageSub = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  color: ${c.text.muted};
  margin: 0;
`
const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  align-items: center;
`
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[6]};
  margin-bottom: ${spacing[8]};
`
const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${spacing[8]};
  align-items: start;
`
const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`
const SectionHeader = styled.div`
  margin-bottom: ${spacing[4]};
`
const SectionTitle = styled.h2`
  font-family: ${typography.family};
  font-size: ${typography.size.h4};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
  margin: 0 0 ${spacing[1]};
`
const SectionSub = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.bodySm};
  color: ${c.text.muted};
  margin: 0;
`
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[4]};
`

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard page
// ─────────────────────────────────────────────────────────────────────────────
export function ExpenseDashboard() {
  const [toasts, setToasts] = useState([])
  const [formVisible, setFormVisible] = useState(true)

  function addToast(type, title, description) {
    const id = Date.now()
    setToasts(t => [...t, { id, type, title, description }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)),
      type === 'error' ? 8000 : 4000)
  }

  function handleSubmit(form) {
    addToast('success', 'Gasto enviado correctamente', 'El gasto fue enviado para aprobación.')
    setFormVisible(false)
    setTimeout(() => setFormVisible(true), 100)
  }

  function handleCancel() {
    addToast('info', 'Formulario descartado', 'Los cambios no fueron guardados.')
  }

  return (
    <Page>
      {/* Topbar */}
      <Topbar>
        <Logo>Volta<LogoSub> Finance</LogoSub></Logo>
        <Nav>
          {['Dashboard', 'Empleados', 'Reportes', 'Configuración'].map(item => (
            <NavItem key={item} $active={item === 'Dashboard'}>{item}</NavItem>
          ))}
        </Nav>
        <Avatar title="Gustavo Amos">GA</Avatar>
      </Topbar>

      <Main>
        {/* Page header */}
        <PageHeader>
          <div>
            <PageTitle>Gastos de empresa</PageTitle>
            <PageSub>Mayo 2026 · Actualizado hace 5 minutos</PageSub>
          </div>
          <HeaderActions>
            {/* Ghost — acción terciaria */}
            <Button variant="ghost" size="md">Exportar CSV</Button>
            {/* Secondary — acción alternativa */}
            <Button variant="secondary" size="md">Filtros</Button>
            {/* Primary — acción principal */}
            <Button variant="primary" size="md" onClick={() => setFormVisible(true)}>
              Nuevo gasto
            </Button>
          </HeaderActions>
        </PageHeader>

        {/* Stat cards */}
        <StatsRow>
          {statCards.map(card => <StatCard key={card.id} {...card} />)}
        </StatsRow>

        {/* Main content */}
        <ContentLayout>
          <LeftCol>
            {/* Categories */}
            <div>
              <SectionHeader>
                <SectionTitle>Gastos por categoría</SectionTitle>
                <SectionSub>Mayo 2026 — desglose por área de la empresa</SectionSub>
              </SectionHeader>
              <CategoriesGrid>
                {categories.map(cat => (
                  <CategoryCard
                    key={cat.id}
                    {...cat}
                    onView={() => addToast('info', `Detalle: ${cat.name}`, 'Próximamente disponible.')}
                  />
                ))}
              </CategoriesGrid>
            </div>

            {/* Transactions table */}
            <div>
              <SectionHeader>
                <SectionTitle>Últimos gastos registrados</SectionTitle>
              </SectionHeader>
              <ExpensesTable
                expenses={recentExpenses}
                total={284}
                onViewAll={() => addToast('info', 'Ver todos', 'Próximamente disponible.')}
              />
            </div>
          </LeftCol>

          {/* Form */}
          {formVisible && (
            <ExpenseForm
              employees={employees}
              categories={categoryOptions}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </ContentLayout>
      </Main>

      {/* Toast container */}
      <ToastContainer>
        {toasts.map(t => (
          <Toast
            key={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            onClose={() => setToasts(ts => ts.filter(x => x.id !== t.id))}
          />
        ))}
      </ToastContainer>
    </Page>
  )
}

export default ExpenseDashboard
