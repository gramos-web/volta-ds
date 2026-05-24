---
pattern: confirmation-flow
version: "1.0.0"
status: stable
figma_page: "DS / Pattern 03 — Confirmation Flow"
ai_priority: critical
components_used: [button, modal, input, notification]
---

# Confirmation Flow — Volta DS

**Regla:** Una acción irreversible sin confirmación es un bug de UX.

## Tabla de decisión

| ¿Reversible? | ¿Afecta a otros? | ¿Elimina datos? | Nivel | Patrón |
|--------------|-----------------|----------------|-------|--------|
| Sí | No | No | 1 | Toast + Deshacer |
| Sí/No | Sí | No | 2 | Modal simple |
| No | — | Total/permanente | 3 | Modal + confirmación escrita |

## Nivel 1 — Bajo riesgo

1. Ejecutar acción directamente
2. Toast success + botón **"Deshacer"** (5s)
3. Si click: revertir + Toast info

```
Ejemplos: archivar, desactivar, quitar de favoritos
```

## Nivel 2 — Riesgo medio

1. Clic → Modal de confirmación
2. Modal: consecuencias + [Cancelar] [Confirmar]
3. Confirmar → loading → Toast success

```
Ejemplos: publicar, transferir ownership, modificar permisos
```

## Nivel 3 — Alto riesgo (flujo completo)

### Paso 1: Trigger
Botón `danger` en Settings. Label: "Eliminar cuenta".

### Paso 2: Modal con consecuencias
```
Título:  "¿Eliminar tu cuenta?"
Body:    Lista exacta de qué se pierde
Footer:  [Cancelar]  [Sí, eliminar — DISABLED]
```

### Paso 3: Confirmación escrita
```
"Escribe 'eliminar' para confirmar:"
[input text]
Footer: [Cancelar]  [Sí, eliminar — activo al match]
```
Case-insensitive: "ELIMINAR", "Eliminar", "eliminar" — todos válidos.

### Paso 4: Loading
```
Modal: "Eliminando cuenta…" + spinner (sin botones)
Al completar: Toast persistente + redirect /login
```

## Reglas invariables

| Regla | |
|-------|--|
| Siempre dar escape | Cancelar siempre activo (excepto loading) |
| Case-insensitive | Cualquier capitalización válida |
| Consecuencias específicas | Listar exactamente qué se pierde |
| Loading irreversible | No cancelar durante loading |
| Toast persistente | No auto-dismiss en eliminación de cuenta |

## Código — Nivel 3

```tsx
const [step, setStep] = useState("idle");
const [confirmText, setConfirmText] = useState("");
const isValid = confirmText.toLowerCase() === "eliminar";

<Modal open={step === "confirm"} title="¿Eliminar tu cuenta?">
  <p>Escribe <strong>eliminar</strong> para confirmar:</p>
  <Input
    value={confirmText}
    onChange={(e) => setConfirmText(e.target.value)}
    placeholder="eliminar"
  />
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setStep("idle")}>Cancelar</Button>
    <Button variant="danger" disabled={!isValid} onClick={handleDelete}>
      Sí, eliminar cuenta
    </Button>
  </Modal.Footer>
</Modal>
```
