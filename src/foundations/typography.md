---
foundation: typography
version: "1.0.0"
status: stable
figma_page: "DS / 02 Foundations — Tipografía"
ai_priority: critical
---

# Typography — Volta DS

**Familia:** Inter — Regular (400), Medium (500), Semi Bold (600), Bold (700)

## Escala

| Token | Size | Weight | line-height | Uso |
|-------|------|--------|-------------|-----|
| `typography.display` | 48px | Bold | 1.1 | Heroes |
| `typography.h1` | 36px | Bold | 1.2 | Títulos de página |
| `typography.h2` | 28px | Bold | 1.25 | Títulos de sección |
| `typography.h3` | 22px | Bold | 1.3 | Subsecciones |
| `typography.h4` | 18px | Semi Bold | 1.35 | Cards, modales |
| `typography.h5` | 16px | Semi Bold | 1.4 | Subtítulos |
| `typography.body-lg` | 15px | Regular | 1.6 | Body largo |
| `typography.body` | 14px | Regular | 1.5 | Body estándar |
| `typography.body-sm` | 13px | Regular | 1.5 | Body secundario |
| `typography.label` | 12px | Semi Bold | 1.4 | Labels, column headers |
| `typography.caption` | 11px | Regular | 1.4 | Helper text, metadata |
| `typography.button-sm` | 12px | Semi Bold | 1 | Botón sm |
| `typography.button` | 14px | Semi Bold | 1 | Botón md |
| `typography.button-lg` | 16px | Semi Bold | 1 | Botón lg |

## Reglas

- **Sentence case siempre** — botones, labels, headers, badges
- **Máximo 3 niveles** tipográficos por pantalla
- **Línea de lectura:** máx 680px; cards: máx 400px
- **Line-height UI:** 1–1.2 para elementos cortos; 1.5–1.6 para lectura

## Combinaciones frecuentes

### Resource List
```
Page title:  typography.h2 — color.text.primary
Row names:   typography.body-sm Medium — color.text.primary
Row meta:    typography.caption — color.text.muted
Col headers: typography.label — color.text.muted
```

### Formulario
```
Title:       typography.h4
Labels:      typography.label — color.text.secondary
Values:      typography.body
Helper:      typography.caption — color.text.muted
Error:       typography.caption — color.feedback.error
```

### Modal
```
Title:       typography.h4 (18px Semi Bold)
Body:        typography.body-sm — color.text.secondary
Actions:     typography.button
```
