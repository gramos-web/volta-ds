# Volta Design System

**Capa AI + código** del Volta DS — documentación `.md` y componentes React consumibles por LLMs y agentes de código.

## Links

- **Figma (capa visual):** https://www.figma.com/design/vjrN5lOBkDJhao0AU2hHYC/Playground---Exploraciones
- **Punto de entrada para agentes:** [AGENTS.md](./AGENTS.md)

## Estructura

```
volta-ds/
├── AGENTS.md                ← leer primero si eres un agente
├── package.json
└── src/
    ├── tokens.js            ← design tokens (color, spacing, radius, shadow, typography)
    ├── index.js             ← barrel exports
    ├── foundations/         ← color.md · typography.md · spacing-radius-shadow.md
    ├── components/
    │   ├── button/          ← Button.jsx + button.md
    │   ├── input/           ← Input.jsx + input.md
    │   ├── modal/           ← Modal.jsx + modal.md
    │   ├── notification/    ← Notification.jsx + notification.md
    │   ├── card/            ← Card.jsx + card.md
    │   ├── badge/           ← Badge.jsx + badge-tag.md
    │   └── examples/        ← FormExample.jsx
    └── patterns/
        ├── form-flow.md
        ├── empty-state.md
        ├── confirmation-flow.md
        └── resource-list.md
```

## Instalación

```bash
# Dependencias requeridas
npm install react react-dom styled-components
```

## Uso

```jsx
import { Button, Input, Badge, Tag, Modal, Toast, Banner, Card } from './src'
import { c, spacing, radius } from './src/tokens'

// Button
<Button variant="primary" size="md" loading={saving}>
  {saving ? 'Guardando…' : 'Guardar cambios'}
</Button>

// Input con validación
<Input
  label="Correo electrónico"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  onBlur={validateEmail}
  error={emailError}
  required
/>

// Badge de estado
<Badge type="success" label="Activo" size="sm" hasDot />

// Card compuesta
<Card>
  <Card.Header title="Nombre del proyecto" meta="12 Mar · Diseño" badge={<Badge type="warning" label="En revisión" size="sm" hasDot />} />
  <Card.Body>Descripción del proyecto.</Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">Ver más</Button>
    <Button variant="primary" size="sm">Abrir</Button>
  </Card.Footer>
</Card>
```

## Estado

| Sección | Archivos | Estado |
|---------|----------|--------|
| Foundations | color, typography, spacing | ✅ Stable v1.0 |
| Components | button, input, modal, notification, card, badge | ✅ Stable v1.0 |
| Patterns | form-flow, empty-state, confirmation-flow, resource-list | ✅ Stable v1.0 |

## Uso en Cursor / Claude Code

```
@volta-ds/AGENTS.md
@volta-ds/src/components/button/button.md
@volta-ds/src/patterns/form-flow.md
```

---
v1.0.0 · Mayo 2025
