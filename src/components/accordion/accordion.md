---
component: accordion
version: "1.0.0"
status: stable
figma_page: "DS / 10 Component — Accordion"
ai_priority: high
use_when:
  - "Mostrar u ocultar contenido secundario bajo demanda"
  - "FAQs, preguntas frecuentes"
  - "Paneles de configuración (Settings)"
  - "Filtros avanzados colapsables"
do_not_use_when:
  - "El usuario necesita ver el contenido siempre — usar sección visible"
  - "El contenido es la acción principal de la pantalla"
  - "Hay menos de 2 ítems — usar sección normal"
related_components: [button, badge-tag]
related_patterns: [form-flow]
---

# Accordion — Volta DS

## Variantes

| Variante | Header bg | Uso |
|----------|-----------|-----|
| `default` | white | Sobre fondo secondary (páginas) |
| `filled` | neutral.50 | Sobre fondo blanco (dentro de cards) |
| `ghost` | transparent | Listas densas, sidebars |

## Estados

| Estado | Visual | Notas |
|--------|--------|-------|
| `collapsed` | Border default, chevron 0° | Estado inicial |
| `expanded` | Border brand.600, chevron 180° | Contenido visible |
| `focus` | Outline 2px brand.400 | Tab y click |
| `disabled` | Opacity 0.45 | No interactivo |

## Anatomía

```
┌─ trigger (56px fijo) ──────────────────────[chevron]─┐
│  [título — 14px Semi Bold]          [badge opcional]  │
├───────────────────────────────────────────────────────┤
│  content                                              │
│  padding: spacing.4 spacing.5                         │
└───────────────────────────────────────────────────────┘
```

- **trigger**: `<button>`, height 56px fijo, padding 0 spacing.5
- **chevron**: 16×16px, rotation 0° collapsed / 180° expanded
- **content**: padding spacing.4 (top/bottom) spacing.5 (left/right)
- **badge**: opcional, alineado derecha del título

## Comportamiento del grupo

| Modo | Uso | Props |
|------|-----|-------|
| `single-expand` | FAQ, ayuda contextual | Solo 1 ítem abierto a la vez |
| `multi-expand` | Settings, filtros | Múltiples ítems abiertos |

## Tokens

```
trigger-height:    56px (fijo)
border-radius:     radius.md (8px) — solo en grupo completo
border-collapsed:  color.border.default (1px)
border-expanded:   color.action.primary (1px)
focus-ring:        color.action.focus (2px, offset 2px)
header-default:    color.surface.primary
header-filled:     color.surface.secondary
title-font:        typography.body (14px Semi Bold)
title-expanded:    color.action.primary
title-collapsed:   color.text.primary
body-font:         typography.body (14px Regular) — color.text.secondary
body-padding:      spacing.4 spacing.5
transition:        height 200ms ease
disabled-opacity:  0.45
```

## Content guidelines

| Parte | ✅ Correcto | ❌ Incorrecto |
|-------|------------|--------------|
| Título FAQ | "¿Cómo cancelo mi suscripción?" | "Cancelar suscripción" |
| Título settings | "Notificaciones" | "Configurar mis notificaciones" |
| Longitud título | Máx 60 caracteres | Más de una línea |
| Body | "Ve a Configuración → Facturación → Cancelar." | "Para poder cancelar primero debes…" |

## Accesibilidad

- `<button>` para el trigger — siempre, nunca `<div>` o `<a>`
- `aria-expanded="true|false"` en el trigger
- `aria-controls="[id-del-panel]"` en el trigger
- `id` en el panel de contenido
- `aria-disabled="true"` en estado disabled
- Enter y Space abren/cierran
- Respetar `prefers-reduced-motion` — sin transición si está activo

## Código

```jsx
// Single item
<Accordion title="¿Cómo cancelo mi suscripción?">
  Ve a Configuración → Facturación → Cancelar plan.
</Accordion>

// Con badge
<Accordion
  title="Notificaciones"
  badge={<Badge type="brand" label="8 activas" size="sm" />}
>
  Configura cuándo y cómo recibir notificaciones.
</Accordion>

// Grupo single-expand (FAQ)
<AccordionGroup>
  <Accordion title="¿Cómo empiezo?">Crea una cuenta y sigue el onboarding.</Accordion>
  <Accordion title="¿Cuántos usuarios puedo agregar?">Depende de tu plan.</Accordion>
  <Accordion title="¿Puedo exportar mis datos?">Sí, en cualquier momento.</Accordion>
</AccordionGroup>

// Grupo multi-expand (Settings)
<AccordionGroup multiExpand variant="filled">
  <Accordion title="Perfil">...</Accordion>
  <Accordion title="Seguridad" badge={<Badge type="success" label="2FA activo" size="sm" />}>
    ...
  </Accordion>
</AccordionGroup>
```
