---
component: badge-tag
version: "1.0.0"
status: stable
figma_page: "DS / 09 Component — Badge & Tag"
ai_priority: high
use_when:
  - "Comunicar estado de un recurso en lista o tabla"
  - "Etiquetar categorías o atributos"
do_not_use_when:
  - "Texto > 2 palabras — usar otro patrón"
  - "Necesita navegación — usar Link"
related_patterns: [resource-list]
---

# Badge & Tag — Volta DS

## Tipos semánticos

| Tipo | bg | border | text | Uso |
|------|----|--------|------|-----|
| `brand` | brand.50 | brand.100 | brand.800 | Novedades, primarios |
| `success` | success.50 | success.600 | success.800 | Activo, completado |
| `error` | error.50 | error.600 | error.800 | Fallido, bloqueado |
| `warning` | warning.50 | warning.600 | warning.800 | Pendiente, en revisión |
| `neutral` | neutral.100 | neutral.200 | neutral.600 | Inactivo, archivado |
| `dark` | neutral.900 | neutral.900 | white | Beta, avanzado |

## Tamaños

| Size | height | font |
|------|--------|------|
| `sm` | 20px | 10px Semi Bold |
| `md` | 24px | 11px Semi Bold |
| `lg` | 28px | 13px Semi Bold |

`border-radius: radius.full` siempre.

## Opciones

- `hasDot: true` — punto de color antes del texto
- `hasX: true` — convierte en Tag eliminable

## Mapeo de estados

| Estado | Tipo | Label |
|--------|------|-------|
| Activo | `success` | "Activo" |
| Publicado | `success` | "Publicado" |
| En revisión | `warning` | "En revisión" |
| Borrador | `warning` | "Borrador" |
| Bloqueado | `error` | "Bloqueado" |
| Archivado | `neutral` | "Archivado" |
| Beta | `dark` | "Beta" |

## Content guidelines

| Regla | ✅ | ❌ |
|-------|---|---|
| Máx 2 palabras | "En revisión" | "Esperando revisión del equipo" |
| Sentence case | "En progreso" | "EN PROGRESO" |
| Sin puntuación | "Completado" | "Completado." |
| Pasado para finales | "Archivado" | "Archivando" |

## Reglas

- Máx 1 badge por fila en tablas
- Colores consistentes en toda la app

## Código

```tsx
<Badge type="success" label="Activo" size="sm" hasDot />
<Tag type="brand" label="Diseño UI" onRemove={() => removeTag("id")} />
```
