---
component: modal
version: "1.0.0"
status: stable
figma_page: "DS / 06 Component — Modal"
ai_priority: high
use_when:
  - "Acción requiere confirmación explícita"
  - "Captura de datos en contexto aislado (máx 4-5 campos)"
  - "Acción destructiva o irreversible"
do_not_use_when:
  - "Contenido informativo sin acción — usar Toast o Banner"
  - "Formulario > 5 campos — usar página completa"
related_patterns: [form-flow, confirmation-flow]
---

# Modal — Volta DS

## Tipos

| Tipo | Botón primario | Uso |
|------|---------------|-----|
| `info` | primary | Consecuencias antes de continuar |
| `confirmation` | primary | Acción que afecta a otros |
| `danger` | danger | Acción irreversible |
| `form` | primary | Captura de datos (máx 4-5 campos) |

## Anatomía

```
┌──────────────────────┐
│  Título (h4)         │
│  Descripción         │
│  [body — opcional]   │
├──────────────────────┤
│     [Cancel] [Prim]  │
└──────────────────────┘
```

## Tokens

```
bg:            color.surface.primary
border-radius: radius.xl (16px)
shadow:        shadow.lg
padding:       spacing.8 (32px)
title:         typography.h4 (18px Semi Bold)
overlay:       rgba(0,0,0, 0.45)
width:         480–520px
```

## Reglas

- Footer: máx 2 acciones — primary derecha, cancelar izquierda
- Título describe la consecuencia, no la pregunta
- Esc cierra (excepto loading)
- Focus trap dentro del modal

## Content guidelines

| | ✅ | ❌ |
|-|---|---|
| Título | "Eliminar este proyecto" | "¿Estás seguro?" |
| Descripción | "Se borrarán todos los archivos permanentemente." | "Esta acción no se puede deshacer." |
| Primary danger | "Sí, eliminar proyecto" | "Eliminar" |

## Código

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Eliminar este proyecto">
  <p>Al eliminar el proyecto se borrarán todos los archivos permanentemente.</p>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
    <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
      {isDeleting ? "Eliminando…" : "Sí, eliminar proyecto"}
    </Button>
  </Modal.Footer>
</Modal>
```
