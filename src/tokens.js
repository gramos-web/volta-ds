/**
 * Volta DS — Design Tokens
 * Fuente de verdad para todos los valores del sistema.
 * Nunca usar valores hardcoded en los componentes — siempre importar desde aquí.
 */

export const color = {
  // Brand
  brand: {
    50:  '#EEF2FF',
    100: '#C7D4FD',
    200: '#9FB5FB',
    400: '#5B82F8',
    600: '#2455E5',
    800: '#1438B0',
    900: '#0C2480',
  },
  // Neutral
  neutral: {
    50:  '#F7F7F5',
    100: '#EBEBEA',
    200: '#D4D4D2',
    400: '#A3A3A0',
    600: '#737370',
    900: '#1A1A18',
  },
  // Semantic
  success: { 50: '#ECFDF5', 600: '#059669', 800: '#065F46' },
  warning: { 50: '#FFFBEB', 600: '#D97706', 800: '#92400E' },
  error:   { 50: '#FEF2F2', 600: '#DC2626', 800: '#991B1B' },
}

// Semantic tokens — use these in components, never primitives
export const c = {
  action: {
    primary:      color.brand[600],
    primaryHover: color.brand[800],
    focus:        color.brand[400],
  },
  feedback: {
    success: color.success[600],
    warning: color.warning[600],
    error:   color.error[600],
  },
  surface: {
    primary:   '#FFFFFF',
    secondary: color.neutral[50],
    tertiary:  color.neutral[100],
  },
  text: {
    primary:   color.neutral[900],
    secondary: color.neutral[600],
    muted:     color.neutral[400],
    onPrimary: '#FFFFFF',
  },
  border: {
    default: color.neutral[200],
    strong:  color.neutral[400],
    focus:   color.brand[400],
    error:   color.error[600],
  },
}

export const spacing = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  7:  '28px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
}

export const radius = {
  none: '0px',
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  full: '9999px',
}

export const shadow = {
  none: 'none',
  sm:   '0 2px 8px rgba(0,0,0,0.06)',
  md:   '0 4px 16px rgba(0,0,0,0.08)',
  lg:   '0 8px 32px rgba(0,0,0,0.12)',
  xl:   '0 12px 40px rgba(0,0,0,0.14)',
}

export const typography = {
  family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  size: {
    display: '48px',
    h1: '36px',
    h2: '28px',
    h3: '22px',
    h4: '18px',
    h5: '16px',
    bodyLg: '15px',
    body: '14px',
    bodySm: '13px',
    label: '12px',
    caption: '11px',
  },
  weight: {
    regular:  400,
    medium:   500,
    semiBold: 600,
    bold:     700,
  },
  lineHeight: {
    tight:  1.2,
    normal: 1.5,
    loose:  1.6,
  },
}
