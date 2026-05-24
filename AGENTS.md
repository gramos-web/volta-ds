# Volta Design System — AGENTS.md
> Punto de entrada para LLMs. Lee este archivo antes de cualquier otro en este repositorio.

## ¿Qué es este repositorio?

Este repositorio contiene la **capa AI** del Volta Design System (Volta DS).
Es la fuente de verdad que los agentes deben consultar para generar UI, componentes, copy y patrones consistentes con el sistema de diseño del producto.

La capa humana (visual, con ejemplos renderizados) vive en Figma:
https://www.figma.com/design/vjrN5lOBkDJhao0AU2hHYC/Playground---Exploraciones

---

## Estructura del repositorio

```
volta-ds/
├── AGENTS.md                    ← estás aquí
├── README.md
├── package.json
└── src/
    ├── tokens.js                ← todos los tokens del sistema
    ├── index.js                 ← barrel exports
    ├── foundations/
    │   ├── color.md
    │   ├── typography.md
    │   └── spacing-radius-shadow.md
    ├── components/
    │   ├── button/
    │   │   ├── Button.jsx
    │   │   └── button.md
    │   ├── input/
    │   │   ├── Input.jsx
    │   │   └── input.md
    │   ├── modal/
    │   │   ├── Modal.jsx
    │   │   └── modal.md
    │   ├── notification/
    │   │   ├── Notification.jsx
    │   │   └── notification.md
    │   ├── card/
    │   │   ├── Card.jsx
    │   │   └── card.md
    │   ├── badge/
    │   │   ├── Badge.jsx
    │   │   └── badge-tag.md
    │   └── examples/
    │       └── FormExample.jsx
    └── patterns/
        ├── form-flow.md
        ├── empty-state.md
        ├── confirmation-flow.md
        └── resource-list.md
```

---

## Instrucciones para agentes

### Antes de generar cualquier UI

1. **Consulta foundations primero** — `src/foundations/color.md` y `typography.md` tienen los tokens. Nunca uses valores hardcoded.
2. **Verifica el componente** — Si existe en `src/components/`, léelo antes de escribir código.
3. **Verifica el patrón** — Si la pantalla corresponde a un patrón en `src/patterns/`, léelo para entender la secuencia completa de estados.

### Reglas que nunca se violan

- **Nunca hardcodear colores** — usar siempre tokens `color.*`
- **Nunca hardcodear spacing** — usar siempre tokens `spacing.*`
- **Un solo botón Primary por vista** — ver `button.md`
- **Labels de botón en sentence case** — ver `button.md`
- **Botones hacen cosas, links van a lugares** — distinción semántica invariable
- **Label siempre visible sobre el input** — nunca solo placeholder como label
- **Error messages específicos** — qué pasó + cómo solucionarlo
- **Acciones destructivas siempre con confirmación** — ver `confirmation-flow.md`
- **Empty states siempre con CTA** — nunca página en blanco

### Tabla de decisión: nivel de confirmación

| Acción | Nivel | Patrón |
|--------|-------|--------|
| Archivar, desactivar | 1 — Bajo | Toast con "Deshacer" (5s) |
| Publicar, transferir ownership | 2 — Medio | Modal de confirmación |
| Eliminar cuenta, borrar workspace | 3 — Alto | Modal + confirmación escrita |

### Tokens de color más usados

| Token | Hex | Uso |
|-------|-----|-----|
| `color.action.primary` | #2455E5 | Botón primary, links, focus |
| `color.action.focus` | #5B82F8 | Focus ring 2px offset 2px |
| `color.feedback.success` | #059669 | Success states, badges activos |
| `color.feedback.error` | #DC2626 | Error states, danger buttons |
| `color.feedback.warning` | #D97706 | Warning states |
| `color.surface.primary` | #FFFFFF | Cards, modales, inputs |
| `color.surface.secondary` | #F7F7F5 | Fondo de página |
| `color.text.primary` | #0A0A0A | Texto principal |
| `color.text.secondary` | #5C5C5C | Subtítulos, descripciones |
| `color.text.muted` | #A3A3A0 | Labels, placeholders, metadata |

---

## Prompts pre-escritos

### Generar un formulario
```
Usando Volta DS (ver src/patterns/form-flow.md), genera un formulario de [propósito]
con los campos [lista]. Aplica: primary disabled hasta completar requeridos,
validación on-blur, error messages con causa+solución, Toast success al enviar.
```

### Generar una pantalla de lista
```
Usando Volta DS (ver src/patterns/resource-list.md), genera Resource List para [recurso].
Columnas: [lista]. Incluye search, filtros, badge de estado, acciones en hover,
bulk action bar. 5 zonas en orden obligatorio.
```

### Generar flujo de eliminación
```
Usando Volta DS (ver src/patterns/confirmation-flow.md), genera flujo nivel 3
para eliminar [entidad]. Modal con consecuencias específicas + input de confirmación
(palabra: "[palabra]") + loading + toast persistente + redirect a [destino].
```

---

## Versionado

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2025-05 | Initial — 3 foundations, 6 components, 4 patterns |
