---
foundation: spacing-radius-shadow
version: "1.0.0"
status: stable
figma_page: "DS / 03 Foundations — Spacing, Radius & Shadows"
ai_priority: high
---

# Spacing, Radius & Shadow — Volta DS

## Spacing — Base 4px

| Token | px | Uso |
|-------|-----|-----|
| `spacing.1` | 4px | Gaps mínimos |
| `spacing.2` | 8px | Gap ícono-label en botón |
| `spacing.3` | 12px | Padding botón sm |
| `spacing.4` | 16px | Padding interno de cards |
| `spacing.5` | 20px | Padding botón md |
| `spacing.6` | 24px | Gap entre cards en grid |
| `spacing.7` | 28px | Padding botón lg |
| `spacing.8` | 32px | Padding modales |
| `spacing.10` | 40px | Separación entre secciones |
| `spacing.12` | 48px | Separación grande |
| `spacing.16` | 64px | Gutter de página |

**Regla:** Siempre múltiplos de 4 — nunca 6px, 10px, 14px.

## Border Radius

| Token | px | Uso |
|-------|----|-----|
| `radius.none` | 0 | Dividers |
| `radius.sm` | 4px | Badges sm |
| `radius.md` | 8px | **Default** — botones, inputs |
| `radius.lg` | 12px | Cards, modales |
| `radius.xl` | 16px | Modales grandes |
| `radius.full` | 9999px | Badges pill, avatares |

**Reglas:** botones e inputs → `radius.md`; cards → `radius.lg`; badges → `radius.full`

## Elevation

| Token | CSS | Uso |
|-------|-----|-----|
| `shadow.none` | none | Elementos en plano base |
| `shadow.sm` | 0 2px 8px rgba(0,0,0,0.06) | Cards en hover |
| `shadow.md` | 0 4px 16px rgba(0,0,0,0.08) | Cards elevadas |
| `shadow.lg` | 0 8px 32px rgba(0,0,0,0.12) | Modales |
| `shadow.xl` | 0 12px 40px rgba(0,0,0,0.14) | Toasts |

**Reglas:** cards en reposo → `shadow.none` + border; modales → `shadow.lg`; toasts → `shadow.xl`

## Layout desktop

```
Viewport: 1440px | Gutter: 64px | Content: 1312px | Grid: 12col gap 24px
```
