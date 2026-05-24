/**
 * FormExample — Volta DS
 *
 * Demonstrates Form Flow pattern:
 * 1. Empty (primary disabled)
 * 2. Filling (primary enabled when required fields complete)
 * 3. Validation error (banner + inline errors)
 * 4. Loading (spinner, fields disabled)
 * 5. Success (toast + redirect)
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { Button }  from '../button/Button'
import { Input }   from '../input/Input'
import { Banner }  from '../notification/Notification'
import { c, spacing, radius, shadow, typography } from '../../tokens'

const FormCard = styled.div`
  background: ${c.surface.primary};
  border: 1px solid ${c.border.default};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  padding: ${spacing[8]};
  max-width: 480px;
  width: 100%;
`

const Title = styled.h2`
  font-family: ${typography.family};
  font-size: ${typography.size.h4};
  font-weight: ${typography.weight.semiBold};
  color: ${c.text.primary};
  margin: 0 0 ${spacing[6]};
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
`

const FooterRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing[3]};
  margin-top: ${spacing[6]};
  padding-top: ${spacing[5]};
  border-top: 1px solid ${c.border.default};
`

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'El nombre del proyecto es obligatorio.'
  if (!form.email.trim()) errors.email = 'El correo es obligatorio.'
  else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
    errors.email = 'Ingresa un correo válido: nombre@empresa.com'
  return errors
}

export function FormExample({ onSuccess, onCancel }) {
  const [form, setForm]         = useState({ name: '', email: '' })
  const [errors, setErrors]     = useState({})
  const [touched, setTouched]   = useState({})
  const [submitting, setSubmitting] = useState(false)

  const isFormValid = form.name.trim() && form.email.trim()
  const hasErrors = Object.keys(errors).length > 0

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }))
    const fieldErrors = validate({ ...form })
    setErrors(e => fieldErrors[field]
      ? { ...e, [field]: fieldErrors[field] }
      : Object.fromEntries(Object.entries(e).filter(([k]) => k !== field))
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allErrors = validate(form)
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      setTouched({ name: true, email: true })
      return
    }
    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    onSuccess?.({ ...form })
  }

  return (
    <FormCard>
      <Title>Crear nuevo proyecto</Title>

      {/* Estado 3: Banner de errores (aparece al intentar enviar con errores) */}
      {hasErrors && Object.values(touched).some(Boolean) && (
        <Banner
          type="error"
          title={`Hay ${Object.keys(errors).length} error${Object.keys(errors).length > 1 ? 'es' : ''} en el formulario. Corrígelos antes de continuar.`}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Fields>
          <Input
            label="Nombre del proyecto"
            placeholder="Ej: Rediseño app móvil Q2"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
            required
            disabled={submitting}
          />
          <Input
            label="Correo de contacto"
            type="email"
            placeholder="nombre@empresa.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            helperText="Te enviaremos actualizaciones del proyecto aquí."
            required
            disabled={submitting}
          />
        </Fields>

        <FooterRow>
          <Button
            variant="secondary"
            type="button"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid || submitting}
            loading={submitting}
          >
            {submitting ? 'Creando proyecto…' : 'Crear proyecto'}
          </Button>
        </FooterRow>
      </form>
    </FormCard>
  )
}

export default FormExample
