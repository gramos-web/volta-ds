---
component: input
version: "1.0.0"
status: stable
figma_page: "DS / 05 Component — Input"
ai_priority: critical
use_when:
  - "Ingresar texto libre"
  - "Búsqueda en lista"
  - "Captura de datos en formulario"
do_not_use_when:
  - "Opciones cerradas — usar Select o Radio"
  - "Selección binaria — usar Toggle"
related_patterns: [form-flow]
---

# Input — Volta DS

## Tipos

| Tipo | Variación | Uso |
|------|-----------|-----|
| `text` | Default | Texto libre |
| `search` | Ícono lupa izquierda | Búsqueda |
| `password` | Chars ocultos + ícono ojo | Contraseñas |
| `textarea` | Min 3 filas, resize vertical | Texto multilínea |
| `email` | Validación de formato | Emails |

## Estados

| Estado | border | bg |
|--------|--------|----|
| `default` | color.border.default 1px | neutral.50 |
| `focus` | color.action.focus 2px | white |
| `filled` | color.border.default 1px | white |
| `error` | color.feedback.error 1.5px | error.50 |
| `disabled` | color.border.default 1px | neutral.100, opacity 0.5 |

## Anatomía

```
[label *]              ← typography.label (12px Semi Bold)
[icon?] [value]        ← height 44px, radius.md
[helper | error]       ← typography.caption (11px Regular)
```

## Tokens

```
height:        44px
border-radius: radius.md (8px)
padding-x:     spacing.4 | spacing.5 con ícono
```

## Content guidelines

| | ✅ | ❌ |
|-|---|---|
| Label | "Nombre completo" | "Nombre" |
| Placeholder | "nombre@empresa.com" | "Escribe aquí" |
| Helper | "Mínimo 8 caracteres, 1 número" | "Contraseña válida" |
| Error | "Ingresa un correo: nombre@empresa.com" | "Campo inválido" |

## Reglas

- Validar **on blur** — nunca on keypress
- Label siempre visible — nunca solo placeholder
- Error = qué pasó + cómo solucionarlo
- Nunca borrar el valor al marcar error

## Código

```tsx
<InputField
  label="Correo electrónico"
  type="email"
  placeholder="nombre@empresa.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={validateEmail}
  error={emailError}
  required
/>
```
