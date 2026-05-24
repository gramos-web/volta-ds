---
pattern: empty-state
version: "1.0.0"
status: stable
figma_page: "DS / Pattern 02 — Empty State"
ai_priority: high
components_used: [button]
---

# Empty State — Volta DS

**Regla:** Nunca mostrar una pantalla en blanco.

## Anatomía (centrado, max-width 480px)

```
① Ilustración   80–120px SVG neutral
② Título        max 8 palabras, typography.h4
③ Descripción   2-3 líneas, typography.body-sm
④ CTA primario  Button primary lg
⑤ Secundaria    Link o Button ghost (opcional)
```

## Variantes

### First-use
```
Título:      "Aún no tienes [recurso]"
Descripción: "Crea tu primer [recurso] para [beneficio]."
CTA:         "Crear primer [recurso]" — primary lg
```

### Search sin resultados
```
Título:      "Sin resultados para "[query]""
Descripción: "Intenta con términos más amplios."
CTA:         "Limpiar búsqueda" — secondary md
```

### Filtered empty
```
Título:      "No hay [recurso] [con ese filtro]"
Descripción: "Hay N [recursos] disponibles. Cambia el filtro."
CTA:         "Ver todos" — secondary md
```

### Error
```
Título:      "No se pudieron cargar los [recursos]"
Descripción: "Error al conectar. Verifica tu conexión."
CTA:         "Reintentar" — secondary md
```

## Content guidelines

| Elemento | ✅ | ❌ |
|----------|---|---|
| Título | "Aún no tienes proyectos" | "No hay nada aquí" |
| Título | "Aún no tienes proyectos" | "No has creado ningún proyecto" |
| Descripción | "Crea tu primer proyecto para organizar tu trabajo." | "No has creado ningún proyecto todavía." |
| CTA | "Crear primer proyecto" | "Añadir" |
| Error | "No se pudieron cargar los proyectos." | "Error 500" |

## Código

```tsx
<EmptyState
  title="Aún no tienes proyectos"
  description="Crea tu primer proyecto para colaborar con tu equipo."
  action={
    <Button variant="primary" size="lg" onClick={handleCreate}>
      Crear primer proyecto
    </Button>
  }
/>
```
