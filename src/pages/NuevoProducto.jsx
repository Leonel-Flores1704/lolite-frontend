import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import SelectionField from '../components/ui/SelectionField'
import CalendarField from '../components/ui/CalendarField'
import { prependItem } from '../utils/localStorage'

const VIA_OPTIONS = ['Oral', 'Intravenosa', 'Intramuscular', 'Subcutánea', 'Tópica'].map((item) => ({ label: item, value: item }))
const PRESENTACION_OPTIONS = ['Caja', 'Blíster', 'Frasco', 'Ampolla', 'Vial', 'Tubo'].map((item) => ({ label: item, value: item }))
const FORMA_OPTIONS = ['Tableta', 'Cápsula', 'Jarabe', 'Inyectable', 'Crema', 'Gotas'].map((item) => ({ label: item, value: item }))
const PROVEEDOR_OPTIONS = ['FarmaPlus', 'MediSupply', 'BioFarma', 'MediEquip'].map((item) => ({ label: item, value: item }))

function Input({ label, value, onChange, placeholder, type = 'text', required = false }) {
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

export default function NuevoProducto() {
  const navigate = useNavigate()
  const [expiration, setExpiration] = useState(new Date())
  const [form, setForm] = useState({
    nombreComercial: '',
    fabricante: '',
    viaAdministracion: '',
    presentacion: '',
    unidadesPorPresentacion: '',
    forma: '',
    costo: '',
    codigoBarras: '',
    proveedor: '',
    lote: '',
    stockInicial: '',
    stockMinimo: '',
  })

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    prependItem('inventario_productos', {
      ...form,
      vencimiento: expiration.toISOString().slice(0, 10),
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/inventario')
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5">
        <button
          type="button"
          onClick={() => navigate('/inventario')}
          className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={14} />
          Volver a inventario
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Nuevo producto</h1>
        <p className="text-sm text-slate-500">Alta de medicamento en inventario</p>
      </div>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input label="Nombre comercial" value={form.nombreComercial} onChange={update('nombreComercial')} placeholder="Paracetamol 500mg" required />
          <Input label="Nombre fabricante" value={form.fabricante} onChange={update('fabricante')} placeholder="Laboratorios X" required />
          <SelectionField label="Vía administración" value={form.viaAdministracion} onChange={(value) => setForm((prev) => ({ ...prev, viaAdministracion: value }))} options={VIA_OPTIONS} required />
          <SelectionField label="Presentación" value={form.presentacion} onChange={(value) => setForm((prev) => ({ ...prev, presentacion: value }))} options={PRESENTACION_OPTIONS} required />
          <Input label="Unidades por presentación" type="number" value={form.unidadesPorPresentacion} onChange={update('unidadesPorPresentacion')} placeholder="20" required />
          <SelectionField label="Forma" value={form.forma} onChange={(value) => setForm((prev) => ({ ...prev, forma: value }))} options={FORMA_OPTIONS} required />
          <Input label="Costo" type="number" value={form.costo} onChange={update('costo')} placeholder="0.00" required />
          <Input label="Código de barras" value={form.codigoBarras} onChange={update('codigoBarras')} placeholder="750102..." />
          <CalendarField label="Vencimiento" value={expiration} onChange={setExpiration} />
          <SelectionField label="Proveedor" value={form.proveedor} onChange={(value) => setForm((prev) => ({ ...prev, proveedor: value }))} options={PROVEEDOR_OPTIONS} required />
          <Input label="Lote" value={form.lote} onChange={update('lote')} placeholder="LOT-2026-001" required />
          <Input label="Stock inicial" type="number" value={form.stockInicial} onChange={update('stockInicial')} placeholder="0" />
          <Input label="Stock mínimo" type="number" value={form.stockMinimo} onChange={update('stockMinimo')} placeholder="0" />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/inventario')} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Cancelar</button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">
            <Save size={14} />
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  )
}
