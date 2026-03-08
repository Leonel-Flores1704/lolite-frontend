import { useMemo, useState } from 'react'
import { AlertCircle, Eye, Package, Pencil, Search, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { readCollection } from '../utils/localStorage'

const baseProducts = [
  { id: 1, nombreComercial: 'Paracetamol 500mg', forma: 'Tableta', categoria: 'Analgésico', stockInicial: 45, stockMinimo: 50, lote: 'LOT-001', vencimiento: '2026-06-15', proveedor: 'FarmaPlus', costo: '2.5', estado: 'Bajo stock' },
  { id: 2, nombreComercial: 'Amoxicilina 500mg', forma: 'Cápsula', categoria: 'Antibiótico', stockInicial: 120, stockMinimo: 30, lote: 'LOT-002', vencimiento: '2026-08-22', proveedor: 'MediSupply', costo: '5.75', estado: 'Disponible' },
  { id: 3, nombreComercial: 'Ibuprofeno 400mg', forma: 'Tableta', categoria: 'Antiinflamatorio', stockInicial: 210, stockMinimo: 60, lote: 'LOT-003', vencimiento: '2026-11-10', proveedor: 'FarmaPlus', costo: '3.2', estado: 'Disponible' },
  { id: 4, nombreComercial: 'Salbutamol Inhalador', forma: 'Inhalador', categoria: 'Broncodilatador', stockInicial: 34, stockMinimo: 20, lote: 'LOT-004', vencimiento: '2027-02-01', proveedor: 'BioFarma', costo: '48', estado: 'Disponible' },
  { id: 5, nombreComercial: 'Insulina Rápida', forma: 'Inyectable', categoria: 'Hormona', stockInicial: 14, stockMinimo: 12, lote: 'LOT-005', vencimiento: '2026-09-15', proveedor: 'BioFarma', costo: '45', estado: 'Disponible' },
  { id: 6, nombreComercial: 'Jeringas 5ml', forma: 'Pieza', categoria: 'Material médico', stockInicial: 80, stockMinimo: 100, lote: 'LOT-006', vencimiento: '2028-01-01', proveedor: 'MediSupply', costo: '0.8', estado: 'Bajo stock' },
  { id: 7, nombreComercial: 'Gasas estériles', forma: 'Paquete', categoria: 'Material médico', stockInicial: 160, stockMinimo: 70, lote: 'LOT-007', vencimiento: '2027-04-20', proveedor: 'Grupo Sanimed', costo: '1.5', estado: 'Disponible' },
  { id: 8, nombreComercial: 'Omeprazol 20mg', forma: 'Cápsula', categoria: 'Gastroprotector', stockInicial: 52, stockMinimo: 40, lote: 'LOT-008', vencimiento: '2026-12-05', proveedor: 'Pharma Norte', costo: '2.9', estado: 'Disponible' },
]

export default function Inventario() {
  const navigate = useNavigate()
  const createdProducts = readCollection('inventario_productos', [])
  const [search, setSearch] = useState('')

  const products = useMemo(() => [...createdProducts, ...baseProducts], [createdProducts])
  const filtered = useMemo(
    () => products.filter((product) => (product.nombreComercial || '').toLowerCase().includes(search.toLowerCase())),
    [products, search],
  )

  const lowStock = filtered.filter((item) => Number(item.stockInicial) <= Number(item.stockMinimo || 0))

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de inventario</h2>
          <p className="text-sm text-slate-500">Control de medicamentos y material médico</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/inventario/nuevo')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Agregar producto
        </button>
      </div>

      {lowStock.length ? (
        <div className="mb-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-orange-600">
            <AlertCircle size={16} />
            <p className="text-sm font-semibold">Alertas de stock</p>
          </div>
          <div className="space-y-1">
            {lowStock.slice(0, 3).map((item) => (
              <p key={`${item.lote}-${item.nombreComercial}`} className="text-sm text-orange-700">
                {item.nombreComercial}: {item.stockInicial} (mínimo {item.stockMinimo})
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto, lote o proveedor"
            className="w-full rounded-xl border border-slate-200 bg-blue-50/50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="grid grid-cols-12 rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-500">
              <span><input type="checkbox" className="h-4 w-4 rounded border border-[#899BA5] bg-slate-50 accent-[#899BA5]" /></span>
              <span className="col-span-2">Producto</span>
              <span>Categoría</span>
              <span>Stock</span>
              <span>Mínimo</span>
              <span>Lote</span>
              <span>Vencimiento</span>
              <span>Proveedor</span>
              <span>Precio</span>
              <span>Estado</span>
              <span className="text-center">Acciones</span>
            </div>

            {filtered.map((item, idx) => {
              const stock = Number(item.stockInicial || 0)
              const min = Number(item.stockMinimo || 0)
              const low = stock <= min
              return (
                <div key={`${item.lote}-${idx}`} className="grid grid-cols-12 items-center border-b border-slate-200 px-3 py-3 text-sm">
                  <span><input type="checkbox" className="h-4 w-4 rounded border border-[#899BA5] bg-slate-50 accent-[#899BA5]" /></span>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50">
                      <Package size={15} className="text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">{item.nombreComercial}</p>
                      <p className="text-xs text-slate-500">{item.forma || item.presentacion || 'Presentación general'}</p>
                    </div>
                  </div>
                  <span>{item.categoria || '-'}</span>
                  <span>{stock}</span>
                  <span>{min}</span>
                  <span>{item.lote || '-'}</span>
                  <span>{item.vencimiento || '-'}</span>
                  <span>{item.proveedor || '-'}</span>
                  <span>${item.costo || '-'}</span>
                  <span>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${low ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {low ? 'Bajo stock' : 'Disponible'}
                    </span>
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Eye size={13} className="text-cyan-600" /></button>
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Pencil size={13} className="text-slate-600" /></button>
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Trash2 size={13} className="text-red-500" /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
