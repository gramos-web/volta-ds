---
component: notification
version: "1.0.0"
status: stable
figma_page: "DS / 07 Component — Notification"
ai_priority: high
use_when:
  - "Feedback post-acción (success, error, warning, info)"
  - "Comunicar estado del sistema de forma no bloqueante"
do_not_use_when:
  - "Error requiere acción inmediata — usar Modal"
related_patterns: [form-flow, resource-list]
---

# Notification & Toast — Volta DS

## Tipos

| Tipo | bg | border/dot | Auto-dismiss |
|------|----|-----------|-------------|
| `success` | success.50 | success.600 | 4s |
| `error` | error.50 | error.600 | 8s o manual |
| `warning` | warning.50 | warning.600 | 6s |
| `info` | brand.50 | brand.600 | 4s |

## Formatos

**Toast:** esquina inferior derecha, auto-dismiss, `radius.lg`, `shadow.xl`

**Banner:** inline al top del contenido, persistente, sin radius, sin shadow

## Anatomía

```
[● dot]  [título — 13px Semi Bold]    [acción?] [✕]
         [descripción — 12px Regular]
```

## Timing

| Tipo | Duración |
|------|---------|
| Success / Info | 4s |
| Warning | 6s |
| Error | 8s o manual |
| Error crítico | Solo manual |

## Reglas

- Toast para feedback de acciones del usuario
- Banner para estado del sistema (mantenimiento, suscripción)
- Error de pago o auth → Banner, nunca Toast
- Siempre especificar qué ocurrió

## Content guidelines

| | ✅ | ❌ |
|-|---|---|
| Título success | "Proyecto creado exitosamente" | "Éxito" |
| Título error | "No se pudo guardar el proyecto" | "Error" |
| Descripción | "El nombre ya está en uso." | "Error al guardar." |

## Código

```tsx
toast.success("Proyecto creado", { duration: 4000 });

toast.error("Error al guardar", {
  description: "No fue posible conectar con el servidor.",
  action: { label: "Reintentar", onClick: handleRetry },
  duration: 8000,
});

<Banner
  type="warning"
  title="Tu suscripción vence en 3 días"
  action={{ label: "Renovar plan", onClick: handleRenew }}
  onClose={() => setBannerVisible(false)}
/>
```
