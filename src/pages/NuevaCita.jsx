import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleDot,
  Clock3,
  Mail,
  Phone,
  Save,
  Search,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react'
import SelectionField from '../components/ui/SelectionField'
import CalendarField from '../components/ui/CalendarField'
import { prependItem } from '../utils/localStorage'

const DOCTORS = [
  { label: 'Dr. Juan pedro', value: 'Dr. Juan Pedro Ramírez' },
  { label: 'Dra. María González', value: 'Dra. María González' },
  { label: 'Dr. Carlos Mendoza', value: 'Dr. Carlos Mendoza' },
]

const CONSULTORIOS = ['Consultorio 1', 'Consultorio 2', 'Consultorio 3', 'Consultorio 4'].map((item) => ({
  label: item,
  value: item,
}))

const HOURS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM', '05:00 PM',
].map((time) => ({ label: time, value: time }))

const STATES = ['Confirmada', 'Pendiente', 'Cancelada'].map((item) => ({
  label: item,
  value: item,
}))

function TextField({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-800">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2">
        {Icon ? <Icon size={15} className="text-cyan-600" /> : null}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default function NuevaCita() {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  const [form, setForm] = useState({
    paciente: '',
    busqueda: '',
    telefono: '',
    correo: '',
    motivo: '',
    doctor: 'Dr. Juan Pedro Ramírez',
    consultorio: '',
    hora: '',
    estado: 'Confirmada',
  })

  const canSave = useMemo(
    () => Boolean(form.paciente && form.doctor && form.consultorio && form.hora),
    [form],
  )

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const saveDraft = () => {
    prependItem('citas_borrador', {
      ...form,
      fecha: date.toISOString(),
      fechaRegistro: new Date().toISOString(),
      tipo: 'borrador',
    })
  }

  const submit = (event) => {
    event.preventDefault()
    if (!canSave) return
    prependItem('citas_registradas', {
      id: `CIT-${Date.now()}`,
      ...form,
      fecha: date.toISOString(),
      fechaTexto: date.toLocaleDateString('es-MX'),
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/citas')
  }

  const fechaResumen = date.toLocaleDateString('es-MX', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const estadoBadgeClass =
    form.estado === 'Confirmada'
      ? 'bg-green-100 text-green-700'
      : form.estado === 'Pendiente'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-red-100 text-red-700'

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Citas / Nueva cita</p>
          <h1 className="text-lg font-bold leading-tight text-slate-900">Agendar nueva cita</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/citas')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={14} />
          Volver
        </button>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <header className="flex items-center justify-between border-b border-cyan-100 px-5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white">
                  <UserRound size={16} />
                </span>
                <h2 className="text-base font-semibold text-slate-900">Datos del paciente</h2>
              </div>
              <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">Paso 1 de 2</span>
            </header>

            <div className="border-b border-cyan-100 px-5 pt-3">
              <div className="flex items-center justify-between">
                <p className="border-b-2 border-cyan-500 pb-2 text-sm font-semibold text-cyan-700">Paciente exstente</p>
                <button
                  type="button"
                  onClick={() => navigate('/pacientes/nuevo')}
                  className="text-base font-semibold text-slate-400 hover:text-slate-600"
                >
                  Registar paciente
                </button>
              </div>
            </div>

            <div className="space-y-2.5 px-5 py-3.5">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-400">Busqueda de paciente</p>
                <label className="mb-1 block text-xs font-semibold text-slate-800">Nombre o numero de expediente</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2">
                  <Search size={15} className="text-cyan-600" />
                  <input
                    value={form.busqueda}
                    onChange={update('busqueda')}
                    placeholder="Ej: Roberto solis o #EXP-0042"
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, busqueda: '' }))}
                    className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField label="Numero de telefono" value={form.telefono} onChange={update('telefono')} placeholder="618-000-00-00" icon={Phone} />
                <TextField label="Correo electronico" value={form.correo} onChange={update('correo')} placeholder="Paciente@gmail.com" icon={Mail} />
              </div>
              <input type="hidden" value={form.paciente} onChange={() => {}} />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <header className="flex items-center justify-between border-b border-cyan-100 px-5 py-2.5">
              <h2 className="text-base font-semibold text-slate-900">Detalles de la cita</h2>
              <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">Paso 2 de 2</span>
            </header>

            <div className="space-y-3 px-5 py-3.5">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-400">Seleccion de doctor</p>
                <SelectionField
                  label=""
                  value={form.doctor}
                  onChange={(value) => setForm((prev) => ({ ...prev, doctor: value }))}
                  options={DOCTORS}
                />
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold text-slate-400">Fecha y hora</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CalendarField label="Fecha cita" value={date} onChange={setDate} />
                  <SelectionField
                    label="Consultorio"
                    value={form.consultorio}
                    onChange={(value) => setForm((prev) => ({ ...prev, consultorio: value }))}
                    options={CONSULTORIOS}
                    placeholder="- Selecciona el consultorio -"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <SelectionField
                  label="Hora"
                  value={form.hora}
                  onChange={(value) => setForm((prev) => ({ ...prev, hora: value }))}
                  options={HOURS}
                  placeholder="- Selecciona el horario disponible -"
                />
                <TextField label="Motivo" value={form.motivo} onChange={update('motivo')} placeholder="Ingresa el motivo" />
                <SelectionField
                  label="Estado"
                  value={form.estado}
                  onChange={(value) => setForm((prev) => ({ ...prev, estado: value }))}
                  options={STATES}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-3.5">
              <button
                type="button"
                onClick={() => navigate('/citas')}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <X size={14} />
                Cancelar
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="rounded-xl border border-slate-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-blue-100"
                >
                  Guardar borrador
                </button>
                <button
                  type="submit"
                  disabled={!canSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={14} />
                  Confirmar cita
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Resumen de cita</h3>
          <p className="text-xs text-slate-400">Vista Previa antes de confirmar cita</p>

          <div className="mt-3 border-t border-cyan-100 pt-1">
            {[
              { icon: UserRound, label: 'Paciente', value: form.paciente || 'Leonel de la cruz flores' },
              { icon: UserRound, label: 'Doctor', value: form.doctor || 'Dr. Juan Pedro Ramírez' },
              { icon: CalendarDays, label: 'Fecha', value: fechaResumen },
              { icon: Clock3, label: 'Hora', value: form.hora || '10:30 AM' },
              { icon: Stethoscope, label: 'Consultorio', value: form.consultorio || 'Consultorio 1' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2 border-b border-cyan-100 py-2.5">
                <div className="flex items-center gap-2">
                  <row.icon size={14} className="text-cyan-600" />
                  <span className="text-sm font-semibold text-slate-900">{row.label}</span>
                </div>
                <span className="max-w-[56%] text-right text-sm text-slate-900">{row.value}</span>
              </div>
            ))}

            <div className="flex items-center justify-between border-b border-cyan-100 py-2.5">
              <div className="flex items-center gap-2">
                <CircleDot size={14} className="text-cyan-600" />
                <span className="text-sm font-semibold text-slate-900">Estado</span>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estadoBadgeClass}`}>
                {form.estado}
              </span>
            </div>
          </div>

          <div className="pt-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ArrowRight size={14} className="text-cyan-600" />
              Próximas citas hoy
            </p>

            <div className="mt-2 space-y-2">
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Próximas citas hoy</p>
                    <p className="text-xs text-slate-500">09:10 AM | Fiebre Alta</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    Confirmada
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Próximas citas hoy</p>
                    <p className="text-xs text-slate-500">10:00 AM | GRIPA</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  )
}
