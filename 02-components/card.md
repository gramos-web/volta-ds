---
component: card
version: "1.0.0"
status: stable
figma_page: "DS / 08 Component — Card"
ai_priority: high
use_when:
  - "Agrupar datos relacionados de un recurso"
  - "Mostrar colecciones en grid"
  - "Mostrar métricas o resúmenes"
do_not_use_when:
  - "Lista larga de ítems simples — usar Table"
related_patterns: [resource-list, empty-state]
---

# Card — Volta DS

## Anatomía (4 zonas)

```
┌──────────────────┐
│  ① Media         │  ← imagen/video — opcional
├──────────────────┤
│  ② Header        │  ← título (obligatorio) + meta
│  ③ Body          │  ← descripción, datos — opcional
├──────────────────┤
│  ④ Footer        │  ← acciones — opcional
└──────────────────┘
```

## Tipos

| Tipo | Zonas | Uso |
|------|-------|-----|
| `info` | Header + Body + Footer | Resumen de entidad |
| `media` | Media + Header + Footer | Proyectos, artículos |
| `stat` | Header + Body métrica | Dashboards, KPIs |
| `user` | Header avatar+nombre + Body | Perfiles |

## Tokens

```
bg:            color.surface.primary
border:        1px solid color.border.default
border-radius: radius.lg (12px)
shadow-rest:   shadow.none
shadow-hover:  shadow.sm
padding:       spacing.5 (20px)
title:         typography.h5 (16px Semi Bold)
meta:          typography.caption — color.text.muted
body:          typography.body-sm — color.text.secondary
```

## Reglas de grid

- Gap: `spacing.6` (24px) siempre
- Altura uniforme en el mismo grid
- Footer al fondo: `display: flex; flex-direction: column`
- 3-4 columnas desktop, 2 tablet, 1 mobile

## Reglas de composición

- Zonas opcionales se omiten si no hay contenido
- Badge de estado: alineado derecha del título, `size: sm`
- Footer: máximo 2 acciones

## Código

```tsx
<Card>
  <Card.Media src={project.thumbnail} alt={project.name} />
  <Card.Header
    title={project.name}
    meta={`${project.date} · ${project.team}`}
    badge={<Badge type="success" label="Activo" hasDot />}
  />
  <Card.Body>{project.description}</Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">Ver detalles</Button>
    <Button variant="primary" size="sm">Abrir</Button>
  </Card.Footer>
</Card>
```
