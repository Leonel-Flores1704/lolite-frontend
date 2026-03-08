import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import SelectionField from '../components/ui/SelectionField'
import { prependItem } from '../utils/localStorage'

const CATEGORY_OPTIONS = [
  'Medicamentos',
  'Material médico',
  'Medicamentos especializados',
  'Equipo médico',
  'Reactivos y diagnóstico',
  'Farmacia',
].map((item) => ({ label: item, value: item }))

const STATUS_OPTIONS = ['Activo', 'Inactivo'].map((item) => ({ label: item, value: item }))

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

export default function NuevoProveedor() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    telefono: '',
    email: '',
    direccion: '',
    productos: '',
    estado: 'Activo',
  })

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    prependItem('proveedores_registrados', {
      ...form,
      productos: form.productos
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      rating: 0,
      compras: 0,
      ultimaCompra: '-',
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/proveedores')
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5">
        <button type="button" onClick={() => navigate('/proveedores')} className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <ArrowLeft size={14} />
          Volver
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Nuevo proveedor</h1>
      </div>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input label="Nombre" value={form.nombre} onChange={update('nombre')} placeholder="FarmaPlus S.A." />
          <SelectionField label="Categoría" value={form.categoria} onChange={(value) => setForm((prev) => ({ ...prev, categoria: value }))} options={CATEGORY_OPTIONS} />
          <SelectionField label="Estado" value={form.estado} onChange={(value) => setForm((prev) => ({ ...prev, estado: value }))} options={STATUS_OPTIONS} />
          <Input label="Teléfono" value={form.telefono} onChange={update('telefono')} placeholder="+52 55 1234 5678" />
          <Input label="Email" value={form.email} onChange={update('email')} type="email" placeholder="proveedor@correo.com" />
          <Input label="Dirección" value={form.direccion} onChange={update('direccion')} placeholder="Calle y ciudad" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Productos principales</label>
          <input
            value={form.productos}
            onChange={update('productos')}
            placeholder="Paracetamol, Ibuprofeno, Jeringas"
            className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/proveedores')} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Cancelar</button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">
            <Save size={14} />
            Guardar proveedor
          </button>
        </div>
      </form>
    </div>
  )
}
