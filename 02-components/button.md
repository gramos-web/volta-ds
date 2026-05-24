---
component: button
version: "2.1"
status: stable
figma_page: "DS / 04 Component — Button"
ai_priority: critical
use_when:
  - "Ejecutar una acción en la pantalla actual"
  - "Confirmar, enviar, crear, guardar, cancelar"
do_not_use_when:
  - "El destino es una URL — usar <Link> o <a>"
related_components: [input, modal, notification]
related_patterns: [form-flow, confirmation-flow]
---

# Button — Volta DS

## Variantes

| Variante | bg | text | Límite |
|----------|----|------|--------|
| `primary` | color.action.primary | white | **1 por vista** |
| `secondary` | white | color.text.primary | Sin límite |
| `ghost` | transparent | color.action.primary | Sin límite |
| `danger` | color.feedback.error | white | Con confirmación previa |

## Tamaños

| Size | height | padding-x | font |
|------|--------|-----------|------|
| `sm` | 32px | spacing.3 | typography.button-sm |
| `md` | 44px | spacing.5 | typography.button |
| `lg` | 52px | spacing.7 | typography.button-lg |

## Estados

| Estado | Visual | Notas |
|--------|--------|-------|
| `default` | — | |
| `hover` | bg → color.action.primary.hover | 150ms ease-out |
| `focus` | outline 2px color.action.focus, offset 2px | Siempre visible |
| `disabled` | opacity 0.4 | No quitar del DOM |
| `loading` | Spinner + "Verbo+ando…" | Ancho fijo |

## Tokens

```
border-radius:    radius.md (8px)
focus-ring:       color.action.focus, 2px, offset 2px
icon-size:        16×16px
icon-gap:         spacing.2 (8px)
disabled-opacity: 0.4
```

## Content guidelines

| Regla | ✅ | ❌ |
|-------|---|---|
| Verbo primero | "Guardar cambios" | "Cambios" |
| Sentence case | "Enviar solicitud" | "Enviar Solicitud" |
| Máx 3 palabras | "Confirmar pago" | "Haz clic para confirmar tu pago" |
| Sin gerundio en reposo | "Guardar" | "Guardando" |
| Específico | "Eliminar cuenta" | "Eliminar" |
| Sin puntuación | "Crear proyecto" | "Crear proyecto." |

## Accesibilidad

- `<button>` nativo siempre
- `aria-label` obligatorio en icon-only
- `aria-busy="true"` durante loading
- Área táctil mínima: 44×44px

## Código

```tsx
// Primary con loading
<Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? "Guardando…" : "Guardar cambios"}
</Button>

// Danger — siempre abre confirmación primero
<Button variant="danger" onClick={() => setConfirmOpen(true)}>
  Eliminar cuenta
</Button>

// Icon-only
<Button variant="ghost" size="sm" aria-label="Filtrar">
  <FilterIcon />
</Button>
```
