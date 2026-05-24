# Volta Design System

**Capa AI** del Volta DS — archivos `.md` consumibles por LLMs y agentes de código.

## Links

- **Figma (capa visual):** https://www.figma.com/design/vjrN5lOBkDJhao0AU2hHYC/Playground---Exploraciones
- **Punto de entrada para agentes:** [AGENTS.md](./AGENTS.md)

## Estructura

```
volta-ds/
├── AGENTS.md          ← leer primero si eres un agente
├── 01-foundations/    ← color, typography, spacing
├── 02-components/     ← button, input, modal, notification, card, badge
└── 03-patterns/       ← form-flow, empty-state, confirmation-flow, resource-list
```

## Estado

| Sección | Estado |
|---------|--------|
| 3 foundations | ✅ Stable v1.0 |
| 6 components | ✅ Stable v1.0 |
| 4 patterns | ✅ Stable v1.0 |

## Uso en Cursor / Copilot / Claude

```
# Reglas globales
@volta-ds/AGENTS.md

# Componente específico
@volta-ds/02-components/button.md

# Patrón de pantalla
@volta-ds/03-patterns/form-flow.md
@volta-ds/03-patterns/resource-list.md
```

---
v1.0.0 · Mayo 2025
