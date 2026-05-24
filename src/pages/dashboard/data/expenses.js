/**
 * Mock data — Gastos de empresa
 * En producción: reemplazar con llamadas a la API.
 */

export const statCards = [
  {
    id: 'total',
    label: 'Total gastado',
    value: '$284.720',
    sub: 'este mes',
    trend: '↑ +12.4% vs mes anterior',
    trendType: 'warning',
    progress: 0.72,
  },
  {
    id: 'budget',
    label: 'Presupuesto disponible',
    value: '$115.280',
    sub: 'de $400.000',
    trend: '28.8% del presupuesto restante',
    trendType: 'success',
    progress: 0.29,
  },
  {
    id: 'pending',
    label: 'Gastos pendientes',
    value: '$23.450',
    sub: '12 solicitudes',
    trend: '⚠ 3 con más de 7 días',
    trendType: 'error',
    progress: 0.6,
  },
  {
    id: 'employees',
    label: 'Empleados activos',
    value: '47',
    sub: 'con gastos este mes',
    trend: '↑ +3 vs mes anterior',
    trendType: 'success',
    progress: 0.78,
  },
]

export const categories = [
  { id: 'tech',      name: 'Tecnología & Software',  amount: '$84.200',  budget: '$100.000', pct: 84, badgeType: 'warning', badgeLabel: '84% del presupuesto', employees: 12 },
  { id: 'travel',    name: 'Viajes & Transporte',     amount: '$62.500',  budget: '$80.000',  pct: 78, badgeType: 'success', badgeLabel: 'En presupuesto',       employees: 18 },
  { id: 'marketing', name: 'Marketing & Publicidad',  amount: '$71.300',  budget: '$90.000',  pct: 79, badgeType: 'success', badgeLabel: 'En presupuesto',       employees: 6  },
  { id: 'food',      name: 'Alimentación & Eventos',  amount: '$38.100',  budget: '$60.000',  pct: 64, badgeType: 'success', badgeLabel: 'En presupuesto',       employees: 47 },
  { id: 'training',  name: 'Capacitación & Cursos',   amount: '$18.620',  budget: '$50.000',  pct: 37, badgeType: 'neutral', badgeLabel: 'Bajo uso',             employees: 9  },
  { id: 'office',    name: 'Equipamiento & Oficina',  amount: '$10.000',  budget: '$20.000',  pct: 50, badgeType: 'neutral', badgeLabel: '50% del presupuesto',  employees: 5  },
]

export const recentExpenses = [
  { id: 1, employee: 'María Rodríguez',  category: 'Tecnología',  description: 'Licencia Adobe CC anual',         amount: '$12.400', status: 'success', statusLabel: 'Aprobado'  },
  { id: 2, employee: 'Carlos Medina',    category: 'Viajes',      description: 'Vuelo Buenos Aires – Mendoza',    amount: '$38.200', status: 'warning', statusLabel: 'Pendiente' },
  { id: 3, employee: 'Ana López',        category: 'Marketing',   description: 'Campaña Google Ads Mayo',         amount: '$15.000', status: 'success', statusLabel: 'Aprobado'  },
  { id: 4, employee: 'Juan García',      category: 'Alimentación',description: 'Almuerzo cliente – La Cabrera',   amount: '$8.400',  status: 'error',   statusLabel: 'Rechazado' },
  { id: 5, employee: 'Sofía Martín',     category: 'Capacitación',description: 'Curso React Avanzado',            amount: '$4.200',  status: 'success', statusLabel: 'Aprobado'  },
]

export const employees = [
  { id: 1, name: 'María Rodríguez',  initials: 'MR' },
  { id: 2, name: 'Carlos Medina',    initials: 'CM' },
  { id: 3, name: 'Ana López',        initials: 'AL' },
  { id: 4, name: 'Juan García',      initials: 'JG' },
  { id: 5, name: 'Sofía Martín',     initials: 'SM' },
]

export const categoryOptions = [
  'Tecnología & Software',
  'Viajes & Transporte',
  'Marketing & Publicidad',
  'Alimentación & Eventos',
  'Capacitación & Cursos',
  'Equipamiento & Oficina',
]
