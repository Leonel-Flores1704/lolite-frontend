import { useMemo, useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SelectionField from '../components/ui/SelectionField'
import CalendarField from '../components/ui/CalendarField'
import { prependItem } from '../utils/localStorage'

const SEX_OPTIONS = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Otro', value: 'Otro' },
]

const BLOOD_OPTIONS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => ({
  label: type,
  value: type,
}))

const DOCTOR_OPTIONS = [
  { label: 'Dr. Juan Pedro Ramírez', value: 'Dr. Juan Pedro Ramírez' },
  { label: 'Dra. Laura Torres', value: 'Dra. Laura Torres' },
  { label: 'Dr. Carlos Mendoza', value: 'Dr. Carlos Mendoza' },
  { label: 'Dra. María González', value: 'Dra. María González' },
]

function TextInput({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  )
}

export default function NuevoPaciente() {
  const navigate = useNavigate()
  const [birthDate, setBirthDate] = useState(new Date())
  const [form, setForm] = useState({
    expediente: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    tipoSangre: '',
    telefono: '',
    email: '',
    direccion: '',
    doctorAsignado: '',
    alergias: '',
    notas: '',
  })

  const fullName = useMemo(
    () => [form.nombre, form.apellidoPaterno, form.apellidoMaterno].filter(Boolean).join(' '),
    [form],
  )

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    const expediente = form.expediente || `EXP-${Date.now().toString().slice(-6)}`
    prependItem('pacientes_registrados', {
      id: Date.now(),
      expediente,
      nombre: fullName,
      edad: new Date().getFullYear() - birthDate.getFullYear(),
      telefono: form.telefono,
      email: form.email,
      ultimaConsulta: '-',
      estado: 'Activo',
      fechaNacimiento: birthDate.toISOString(),
      sexo: form.sexo,
      tipoSangre: form.tipoSangre,
      alergias: form.alergias,
      direccion: form.direccion,
      doctorAsignado: form.doctorAsignado,
      notas: form.notas,
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/pacientes')
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Pacientes / Nuevo paciente</p>
          <h1 className="text-2xl font-bold text-slate-800">Registro inicial de paciente</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/pacientes')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={14} />
          Volver
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-800">Datos básicos</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextInput label="Expediente (opcional)" value={form.expediente} onChange={update('expediente')} placeholder="Se genera automáticamente" />
            <TextInput label="Nombre" value={form.nombre} onChange={update('nombre')} placeholder="Nombre" required />
            <TextInput label="Apellido paterno" value={form.apellidoPaterno} onChange={update('apellidoPaterno')} placeholder="Apellido paterno" required />
            <TextInput label="Apellido materno" value={form.apellidoMaterno} onChange={update('apellidoMaterno')} placeholder="Apellido materno" required />
            <CalendarField label="Fecha de nacimiento" value={birthDate} onChange={setBirthDate} />
            <SelectionField label="Sexo" value={form.sexo} onChange={(value) => setForm((prev) => ({ ...prev, sexo: value }))} options={SEX_OPTIONS} required />
            <SelectionField label="Tipo de sangre" value={form.tipoSangre} onChange={(value) => setForm((prev) => ({ ...prev, tipoSangre: value }))} options={BLOOD_OPTIONS} />
            <SelectionField label="Doctor asignado" value={form.doctorAsignado} onChange={(value) => setForm((prev) => ({ ...prev, doctorAsignado: value }))} options={DOCTOR_OPTIONS} required />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-800">Contacto</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput label="Teléfono" value={form.telefono} onChange={update('telefono')} placeholder="618 000 0000" required />
            <TextInput label="Correo" value={form.email} onChange={update('email')} placeholder="paciente@correo.com" type="email" required />
            <div className="md:col-span-2">
              <TextInput label="Dirección" value={form.direccion} onChange={update('direccion')} placeholder="Calle, número, colonia, ciudad" required />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-800">Notas iniciales</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput
              label="Alergia principal"
              value={form.alergias}
              onChange={update('alergias')}
              placeholder="Ej. Penicilina"
            />
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Notas clínicas</label>
              <textarea
                rows={4}
                value={form.notas}
                onChange={update('notas')}
                placeholder="Observaciones clínicas iniciales"
                className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/pacientes')}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500"
          >
            <Save size={14} />
            Guardar paciente
          </button>
        </div>
      </form>
    </div>
  )
}
