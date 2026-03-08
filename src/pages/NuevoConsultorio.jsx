import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import SelectionField from '../components/ui/SelectionField'
import { prependItem } from '../utils/localStorage'

const ESTADOS = ['Disponible', 'Ocupado', 'Mantenimiento'].map((item) => ({ label: item, value: item }))
const ESPECIALIDADES = ['Medicina General', 'Pediatría', 'Cardiología', 'Oftalmología', 'Ginecología', 'Odontología'].map((item) => ({ label: item, value: item }))

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  )
}

export default function NuevoConsultorio() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    ubicacion: '',
    estado: 'Disponible',
    doctor: '',
    especialidad: '',
    horarioInicio: '',
    horarioFin: '',
    citasDia: '',
    capacidad: '',
    codigoInterno: '',
    equipamiento: '',
    notas: '',
  })

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    prependItem('consultorios_registrados', {
      ...form,
      horario: form.horarioInicio && form.horarioFin ? `${form.horarioInicio} - ${form.horarioFin}` : '-',
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/consultorios')
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5">
        <button type="button" onClick={() => navigate('/consultorios')} className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <ArrowLeft size={14} />
          Volver
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Nuevo consultorio</h1>
        <p className="text-sm text-slate-500">Formulario de alta para consultorio</p>
      </div>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input label="Nombre" value={form.nombre} onChange={update('nombre')} placeholder="Consultorio 6" />
          <Input label="Ubicación" value={form.ubicacion} onChange={update('ubicacion')} placeholder="Piso 3, Sala F" />
          <SelectionField label="Estado" value={form.estado} onChange={(value) => setForm((prev) => ({ ...prev, estado: value }))} options={ESTADOS} />
          <Input label="Doctor" value={form.doctor} onChange={update('doctor')} placeholder="Dra. Laura Torres" />
          <SelectionField label="Especialidad" value={form.especialidad} onChange={(value) => setForm((prev) => ({ ...prev, especialidad: value }))} options={ESPECIALIDADES} />
          <Input label="Citas por día" value={form.citasDia} onChange={update('citasDia')} type="number" placeholder="10" />
          <Input label="Horario inicio" value={form.horarioInicio} onChange={update('horarioInicio')} type="time" />
          <Input label="Horario fin" value={form.horarioFin} onChange={update('horarioFin')} type="time" />
          <Input label="Capacidad" value={form.capacidad} onChange={update('capacidad')} type="number" placeholder="12" />
          <Input label="Código interno" value={form.codigoInterno} onChange={update('codigoInterno')} placeholder="CONS-006" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Equipamiento</label>
            <textarea
              rows={4}
              value={form.equipamiento}
              onChange={update('equipamiento')}
              placeholder="Camilla, Estetoscopio, Monitor"
              className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Notas</label>
            <textarea
              rows={4}
              value={form.notas}
              onChange={update('notas')}
              placeholder="Observaciones adicionales"
              className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/consultorios')} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Cancelar</button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">
            <Save size={14} />
            Guardar consultorio
          </button>
        </div>
      </form>
    </div>
  )
}
