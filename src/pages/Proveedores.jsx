import { useMemo, useState } from 'react'
import { Building2, Eye, Mail, MapPin, Pencil, Phone, Search, Star, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { readCollection } from '../utils/localStorage'

const baseProviders = [
  { id: 1, nombre: 'FarmaPlus S.A.', categoria: 'Medicamentos', telefono: '+52 (55) 1234-5678', email: 'contacto@farmaplus.com', direccion: 'Av. Reforma 123, CDMX', contacto: 'Carlos Ramírez', productos: ['Paracetamol', 'Ibuprofeno', '+1'], estado: 'Activo', compras: 45, ultimaCompra: '15/02/2026', rating: 4.8 },
  { id: 2, nombre: 'MediSupply Corp', categoria: 'Material Médico', telefono: '+52 (55) 2345-6789', email: 'ventas@medisupply.com', direccion: 'Blvd. Insurgentes 456, CDMX', contacto: 'Ana López', productos: ['Jeringas', 'Gasas', '+1'], estado: 'Activo', compras: 32, ultimaCompra: '18/02/2026', rating: 4.5 },
  { id: 3, nombre: 'BioFarma Internacional', categoria: 'Medicamentos Especializados', telefono: '+52 (55) 3456-7890', email: 'info@biofarma.com', direccion: 'Polanco 789, CDMX', contacto: 'Dr. Roberto Silva', productos: ['Insulina', 'Hormonas', '+1'], estado: 'Activo', compras: 28, ultimaCompra: '20/02/2026', rating: 4.9 },
  { id: 4, nombre: 'MediEquip Pro', categoria: 'Equipo Médico', telefono: '+52 (55) 4567-8901', email: 'equipos@mediequip.com', direccion: 'Chapultepec 321, CDMX', contacto: 'Laura Mendoza', productos: ['Monitor', 'ECG', '+1'], estado: 'Activo', compras: 22, ultimaCompra: '19/02/2026', rating: 4.6 },
  { id: 5, nombre: 'Laboratorios Delta', categoria: 'Reactivos y Diagnóstico', telefono: '+52 (55) 5678-9012', email: 'contacto@labdelta.com', direccion: 'Santa Fe 555, CDMX', contacto: 'Miguel Torres', productos: ['Reactivos', 'Pruebas rápidas', '+1'], estado: 'Activo', compras: 18, ultimaCompra: '17/02/2026', rating: 4.4 },
  { id: 6, nombre: 'Grupo Sanimed', categoria: 'Material Médico', telefono: '+52 (55) 2222-1111', email: 'ventas@sanimed.com', direccion: 'Roma Norte 214, CDMX', contacto: 'Andrea Ruiz', productos: ['Guantes', 'Mascarillas', '+1'], estado: 'Activo', compras: 15, ultimaCompra: '14/02/2026', rating: 4.3 },
  { id: 7, nombre: 'Pharma Norte', categoria: 'Medicamentos', telefono: '+52 (55) 9090-7878', email: 'atencion@pharmanorte.com', direccion: 'Av. Universidad 921, CDMX', contacto: 'Luis Orozco', productos: ['Amoxicilina', 'Ibuprofeno', '+1'], estado: 'Inactivo', compras: 11, ultimaCompra: '10/02/2026', rating: 4.1 },
]

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={11} className={index < Math.floor(value || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
      ))}
      <span className="ml-1 text-sm text-slate-700">{value || 0}</span>
    </div>
  )
}

export default function Proveedores() {
  const navigate = useNavigate()
  const created = readCollection('proveedores_registrados', [])
  const [search, setSearch] = useState('')

  const providers = useMemo(() => [...created, ...baseProviders], [created])
  const filtered = useMemo(
    () => providers.filter((item) => item.nombre.toLowerCase().includes(search.toLowerCase())),
    [providers, search],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de proveedores</h2>
          <p className="text-sm text-slate-500">Relación comercial de compras y abastecimiento</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/proveedores/nuevo')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Nuevo proveedor
        </button>
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar proveedor"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {filtered.slice(0, 5).map((item, index) => (
          <article key={`${item.nombre}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
                <Building2 size={24} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{item.nombre}</p>
                <span className="mt-1 inline-flex rounded-full border border-slate-200 px-3 py-0.5 text-sm">{item.categoria}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-slate-200 pb-3 text-sm text-slate-700">
              <p className="flex items-center gap-2"><Phone size={16} className="text-slate-400" />{item.telefono}</p>
              <p className="flex items-center gap-2"><Mail size={16} className="text-slate-400" />{item.email}</p>
              <p className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" />{item.direccion}</p>
            </div>

            <div className="border-b border-slate-200 py-3">
              <p className="text-sm text-slate-600">Contacto: {item.contacto || 'Sin asignar'}</p>
              <p className="mt-1 text-sm text-slate-600">Productos principales:</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {(Array.isArray(item.productos) ? item.productos : []).slice(0, 3).map((product) => (
                  <span key={product} className="rounded-xl border border-slate-200 px-2.5 py-0.5 text-sm">{product}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 py-3">
              <Rating value={item.rating} />
              <span className={`rounded-full border px-3 py-0.5 text-sm ${item.estado === 'Activo' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'}`}>{item.estado}</span>
            </div>

            <div className="flex items-center justify-between py-3 text-sm text-slate-700">
              <span>Compras: {item.compras}</span>
              <span>Última: {item.ultimaCompra}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Ver</button>
              <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Editar</button>
            </div>
          </article>
        ))}
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="min-w-[1060px]">
          <div className="grid grid-cols-[44px_1.35fr_1fr_1fr_1fr_1fr_120px] rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-500">
            <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>
            <span>Proveedor</span>
            <span>Categoría</span>
            <span>Contacto</span>
            <span>Rating</span>
            <span>Compras</span>
            <span className="text-center">Acciones</span>
          </div>
          {filtered.map((item, index) => (
            <div key={`${item.nombre}-${index}`} className="grid grid-cols-[44px_1.35fr_1fr_1fr_1fr_1fr_120px] items-center border-b border-slate-200 px-3 py-3 text-sm">
              <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>
              <span className="font-semibold text-slate-700">{item.nombre}</span>
              <span>{item.categoria}</span>
              <span className="text-xs">{item.email}</span>
              <Rating value={item.rating} />
              <span>{item.compras || 0}</span>
              <div className="flex items-center justify-center gap-1">
                <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Eye size={13} className="text-cyan-600" /></button>
                <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Trash2 size={13} className="text-cyan-600" /></button>
                <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Pencil size={13} className="text-cyan-600" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
