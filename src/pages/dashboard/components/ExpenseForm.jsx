import React, { useState } from 'react'
import styled from 'styled-components'
import { c, spacing, radius, shadow, typography } from '../../../volta-ds/tokens'
import { Button } from '../../../volta-ds/components/button/Button'
import { Input } from '../../../volta-ds/components/input/Input'
import { Banner } from '../../../volta-ds/components/notification/Notification'

const Card = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  overflow: hidden;
  position: sticky;
  top: ${spacing[6]};
`
const FormHeader = styled.div`
  background: ${c.surface.secondary};
  padding: ${spacing[4]} ${spacing[5]};
  border-bottom: 1px solid ${c.border.default};
`
const FormTitle = styled.h2`
  font-family: ${typography.family};
  font-size: ${typography.size.h5};
  font-weight: ${typography.weight.semiBold};
  color: ${c.action.primary};
  margin: 0 0 2px;
`
const FormSub = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  color: ${c.action.primaryHover};
  margin: 0;
`
const FormBody = styled.form`
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[3]};
`
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`
const FieldLabel = styled.label`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.secondary};
`
const Select = styled.select`
  height: 44px;
  width: 100%;
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  color: ${c.text.primary};
  background: ${c.surface.secondary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.md};
  padding: 0 ${spacing[3]};
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: border-color 150ms ease;

  &:focus {
    border-color: ${c.action.focus};
    border-width: 2px;
    background: ${c.surface.primary};
  }
`
const UploadArea = styled.div`
  border: 1.5px dashed ${c.border.strong};
  border-radius: ${radius.md};
  background: ${c.surface.secondary};
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[2]};
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;

  &:hover {
    border-color: ${c.action.primary};
    background: ${c.surface.primary};
  }
`
const UploadText = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.label};
  color: ${c.text.muted};
  margin: 0;
  text-align: center;
`
const UploadHint = styled.p`
  font-family: ${typography.family};
  font-size: ${typography.size.caption};
  color: ${c.text.muted};
  margin: 0;
`
const Textarea = styled.textarea`
  width: 100%;
  min-height: 72px;
  font-family: ${typography.family};
  font-size: ${typography.size.body};
  color: ${c.text.primary};
  background: ${c.surface.secondary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.md};
  padding: ${spacing[3]};
  resize: vertical;
  outline: none;
  transition: border-color 150ms ease;

  &::placeholder { color: ${c.text.muted}; }
  &:focus {
    border-color: ${c.action.focus};
    border-width: 2px;
    background: ${c.surface.primary};
  }
`
const FormDivider = styled.hr`
  border: none;
  border-top: 1px solid ${c.border.default};
  margin: 0;
`
const FormFooter = styled.div`
  padding: ${spacing[4]} ${spacing[5]};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`
const FooterSpacer = styled.div`flex: 1;`

function validate(form) {
  const errors = {}
  if (!form.employee)    errors.employee = 'Seleccioná un empleado.'
  if (!form.category)    errors.category = 'Seleccioná una categoría.'
  if (!form.description.trim()) errors.description = 'La descripción es obligatoria.'
  if (!form.amount.trim())      errors.amount = 'Ingresá el monto.'
  else if (isNaN(form.amount.replace(',', '.'))) errors.amount = 'Ingresá un número válido.'
  if (!form.date)               errors.date = 'Seleccioná una fecha.'
  return errors
}

export function ExpenseForm({ employees, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    employee: '', category: '', description: '', amount: '', date: '', notes: ''
  })
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const [saving, setSaving]   = useState(false)
  const [draft, setDraft]     = useState(false)

  const isValid = form.employee && form.category && form.description && form.amount && form.date
  const hasErrors = Object.keys(errors).filter(k => touched[k]).length > 0

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }))
    const allErrors = validate(form)
    setErrors(e => allErrors[field]
      ? { ...e, [field]: allErrors[field] }
      : Object.fromEntries(Object.entries(e).filter(([k]) => k !== field))
    )
  }

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allErrors = validate(form)
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      setTouched({ employee: true, category: true, description: true, amount: true, date: true })
      return
    }
    setSaving(true)
    await new Promise(r => setTimeout(r, 1500))
    setSaving(false)
    onSubmit?.(form)
  }

  async function handleDraft() {
    setDraft(true)
    await new Promise(r => setTimeout(r, 800))
    setDraft(false)
    // In production: save draft to API
  }

  return (
    <Card>
      <FormHeader>
        <FormTitle>Nuevo gasto</FormTitle>
        <FormSub>Registrá un gasto de empresa</FormSub>
      </FormHeader>

      <FormBody onSubmit={handleSubmit} noValidate>

        {/* Estado 3: Banner de errores */}
        {hasErrors && (
          <Banner
            type="error"
            title={`Hay ${Object.keys(errors).filter(k => touched[k]).length} errores. Corrígelos antes de enviar.`}
          />
        )}

        {/* Empleado */}
        <FieldWrapper>
          <FieldLabel htmlFor="employee">Empleado *</FieldLabel>
          <Select
            id="employee"
            value={form.employee}
            onChange={set('employee')}
            onBlur={() => handleBlur('employee')}
            aria-invalid={!!errors.employee}
            aria-required="true"
          >
            <option value="">Seleccioná un empleado…</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </Select>
          {touched.employee && errors.employee && (
            <span style={{ fontSize: '11px', color: c.feedback.error, fontFamily: typography.family }}>
              {errors.employee}
            </span>
          )}
        </FieldWrapper>

        {/* Categoría */}
        <FieldWrapper>
          <FieldLabel htmlFor="category">Categoría *</FieldLabel>
          <Select
            id="category"
            value={form.category}
            onChange={set('category')}
            onBlur={() => handleBlur('category')}
          >
            <option value="">Seleccioná una categoría…</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
          {touched.category && errors.category && (
            <span style={{ fontSize: '11px', color: c.feedback.error, fontFamily: typography.family }}>
              {errors.category}
            </span>
          )}
        </FieldWrapper>

        {/* Descripción */}
        <Input
          label="Descripción *"
          placeholder="Ej: Licencia Adobe CC anual"
          value={form.description}
          onChange={set('description')}
          onBlur={() => handleBlur('description')}
          error={touched.description ? errors.description : undefined}
          required
          disabled={saving}
        />

        {/* Monto + Fecha */}
        <TwoCol>
          <Input
            label="Monto *"
            placeholder="0.000"
            value={form.amount}
            onChange={set('amount')}
            onBlur={() => handleBlur('amount')}
            error={touched.amount ? errors.amount : undefined}
            required
            disabled={saving}
          />
          <Input
            label="Fecha *"
            type="date"
            value={form.date}
            onChange={set('date')}
            onBlur={() => handleBlur('date')}
            error={touched.date ? errors.date : undefined}
            required
            disabled={saving}
          />
        </TwoCol>

        {/* Comprobante */}
        <FieldWrapper>
          <FieldLabel>Comprobante</FieldLabel>
          <UploadArea>
            <UploadText>Arrastrá el archivo o hacé clic para subir</UploadText>
            <UploadHint>PDF, JPG o PNG · Máx 5MB</UploadHint>
          </UploadArea>
        </FieldWrapper>

        {/* Notas */}
        <FieldWrapper>
          <FieldLabel htmlFor="notes">Notas adicionales</FieldLabel>
          <Textarea
            id="notes"
            placeholder="Ej: Almuerzo con cliente para cierre de contrato…"
            value={form.notes}
            onChange={set('notes')}
            disabled={saving}
          />
        </FieldWrapper>

      </FormBody>

      <FormDivider />

      <FormFooter>
        {/* Secondary — Cancelar */}
        <Button variant="secondary" type="button" onClick={onCancel} disabled={saving}>
          Cancelar
        </Button>
        {/* Ghost — Guardar borrador */}
        <Button variant="ghost" type="button" onClick={handleDraft} loading={draft} disabled={saving}>
          {draft ? 'Guardando…' : 'Guardar borrador'}
        </Button>
        <FooterSpacer />
        {/* Primary — Enviar gasto */}
        <Button
          variant="primary"
          type="submit"
          disabled={!isValid || saving}
          loading={saving}
          onClick={handleSubmit}
        >
          {saving ? 'Enviando…' : 'Enviar gasto'}
        </Button>
      </FormFooter>
    </Card>
  )
}
