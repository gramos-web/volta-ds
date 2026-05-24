---
pattern: form-flow
version: "1.0.0"
status: stable
figma_page: "DS / Pattern 01 — Form Flow"
ai_priority: critical
components_used: [input, button, notification, modal]
---

# Form Flow — Volta DS

## Los 5 estados (obligatorios)

### 1 — Vacío
- Campos en `default`
- Primary **disabled** hasta completar requeridos

### 2 — Llenando
- Campo activo en `focus`, con valor en `filled`
- Primary se habilita al completar requeridos

### 3 — Error de validación
- **Banner inline** top del form: "Hay N errores en el formulario."
- Campos en estado `error` con error message
- Scroll al primer campo con error
- **Nunca borrar el valor** — solo marcar el error

### 4 — Enviando
- Primary: "Verbo+ando…" + spinner, **ancho fijo**
- Todos los campos `disabled`
- Cancelar también `disabled`
- Flag para prevenir doble submit

### 5 — Éxito
- Toast success (4s): "[Entidad] [acción] exitosamente"
- Redirección al recurso

## Reglas de validación

| Regla | |
|-------|--|
| Timing | On blur — nunca on keypress |
| Mostrar todos | Al intentar enviar, mostrar todos los errores |
| Scroll al primero | Scroll + focus al primer campo con error |
| No borrar valores | Error sobre el valor, nunca borrar |

## Feedback post-envío

| Resultado | Patrón |
|-----------|--------|
| Éxito | Toast success (4s) + redirección |
| Error servidor | Toast error (8s) + "Reintentar" |
| Error validación | Banner + campos marcados |
| Salir con cambios | Modal "¿Descartar cambios?" |

## Variantes

- **Single-step:** < 6 campos, footer con primary + cancelar
- **Multi-step:** pasos numerados, "Siguiente" valida paso actual
- **Modal form:** máx 4-5 campos, confirmación al cerrar si dirty
- **Inline editing:** click → input, Enter guarda, Esc cancela

## Código

```tsx
<Form onSubmit={handleSubmit}>
  {formErrors.length > 0 && (
    <Banner type="error" title={`Hay ${formErrors.length} errores.`} />
  )}
  <InputField
    label="Nombre del proyecto *"
    error={errors.name}
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    onBlur={() => validateField("name")}
    required
  />
  <FormFooter>
    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
    <Button
      variant="primary"
      type="submit"
      disabled={!isFormValid || isSubmitting}
      loading={isSubmitting}
    >
      {isSubmitting ? "Creando proyecto…" : "Crear proyecto"}
    </Button>
  </FormFooter>
</Form>
```
