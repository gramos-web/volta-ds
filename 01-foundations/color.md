---
foundation: color
version: "1.0.0"
status: stable
figma_page: "DS / 01 Foundations — Color"
ai_priority: critical
---

# Color — Volta DS

## Paleta base

### Brand
| Token | Hex | Uso |
|-------|-----|-----|
| `brand.50` | #EEF2FF | Fondos de badges, banners info |
| `brand.100` | #C7D4FD | Bordes sutiles, hover states |
| `brand.400` | #5B82F8 | Focus rings |
| `brand.600` | #2455E5 | **Acción primaria** |
| `brand.800` | #1438B0 | Hover sobre brand.600 |

### Neutral
| Token | Hex | Uso |
|-------|-----|-----|
| `neutral.50` | #F7F7F5 | Fondo de página |
| `neutral.100` | #EBEBEA | Table headers, skeletons |
| `neutral.200` | #D4D4D2 | Bordes, dividers |
| `neutral.400` | #A3A3A0 | Placeholders, labels |
| `neutral.600` | #737370 | Texto secundario |
| `neutral.900` | #1A1A18 | Texto principal, bulk bars |

### Semánticos
| Token | Hex | Uso |
|-------|-----|-----|
| `success.50` | #ECFDF5 | Fondos success |
| `success.600` | #059669 | Estado positivo |
| `success.800` | #065F46 | Texto sobre success.50 |
| `warning.50` | #FFFBEB | Fondos warning |
| `warning.600` | #D97706 | Estado de atención |
| `warning.800` | #92400E | Texto sobre warning.50 |
| `error.50` | #FEF2F2 | Fondos error |
| `error.600` | #DC2626 | Estado crítico |
| `error.800` | #991B1B | Texto sobre error.50 |

---

## Tokens semánticos (usar siempre estos)

### Acción
| Token | Primitivo |
|-------|-----------|
| `color.action.primary` | brand.600 |
| `color.action.primary.hover` | brand.800 |
| `color.action.focus` | brand.400 |

### Feedback
| Token | Primitivo |
|-------|-----------|
| `color.feedback.success` | success.600 |
| `color.feedback.warning` | warning.600 |
| `color.feedback.error` | error.600 |

### Superficie
| Token | Primitivo |
|-------|-----------|
| `color.surface.primary` | #FFFFFF |
| `color.surface.secondary` | neutral.50 |
| `color.surface.tertiary` | neutral.100 |

### Texto
| Token | Primitivo |
|-------|-----------|
| `color.text.primary` | neutral.900 |
| `color.text.secondary` | neutral.600 |
| `color.text.muted` | neutral.400 |
| `color.text.on-primary` | #FFFFFF |

### Borde
| Token | Primitivo |
|-------|-----------|
| `color.border.default` | neutral.200 |
| `color.border.focus` | brand.400 |
| `color.border.error` | error.600 |

---

## Contraste WCAG AA

| Combinación | Ratio | |
|-------------|-------|-|
| Blanco / brand.600 | 6.2:1 | ✅ AA |
| Blanco / error.600 | 5.9:1 | ✅ AA |
| neutral.900 / white | 19.5:1 | ✅ AAA |
| neutral.600 / white | 7.2:1 | ✅ AA |

---

## Reglas

- Nunca usar primitivos directamente — usar tokens semánticos
- El color nunca es el único indicador de estado (accesibilidad)
- Fondo de página: `color.surface.secondary`
- Fondo de cards: `color.surface.primary`
