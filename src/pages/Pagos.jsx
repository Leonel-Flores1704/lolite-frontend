import { useState } from 'react'
import { CreditCard, DollarSign, Search } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const lineData = [
  { mes: 'Ene', ingresos: 11000, gastos: 8500 },
  { mes: 'Feb', ingresos: 14500, gastos: 9200 },
  { mes: 'Mar', ingresos: 16500, gastos: 10000 },
  { mes: 'Abr', ingresos: 15000, gastos: 9800 },
  { mes: 'May', ingresos: 18500, gastos: 10500 },
  { mes: 'Jun', ingresos: 21500, gastos: 11000 },
]

const barData = [
  { mes: 'Ene', pacientes: 45 },
  { mes: 'Feb', pacientes: 52 },
  { mes: 'Mar', pacientes: 49 },
  { mes: 'Abr', pacientes: 61 },
  { mes: 'May', pacientes: 55 },
  { mes: 'Jun', pacientes: 63 },
]

const pagos = [
  { id: 'PAG-001', paciente: 'Leonel Ramo', concepto: 'Consulta general', monto: '$895.00', metodo: 'Tarjeta', estado: 'Pendiente' },
  { id: 'PAG-002', paciente: 'María González', concepto: 'Farmacia', monto: '$1,300.00', metodo: 'Transferencia', estado: 'Pagado' },
  { id: 'PAG-003', paciente: 'Roberto Silva', concepto: 'Consulta + medicamentos', monto: '$695.00', metodo: 'Efectivo', estado: 'Pagado' },
]

export default function Pagos() {
  const [search, setSearch] = useState('')
  const filtered = pagos.filter((item) =>
    `${item.id} ${item.paciente}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Gestión de pagos</h2>
        <p className="text-sm text-slate-500">Control de cobros, transacciones y facturación</p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Ingresos del mes', value: '$45,850', icon: DollarSign },
          { label: 'Pagos pendientes', value: '$3,950', icon: CreditCard },
          { label: 'Pagos completados', value: '156', icon: CreditCard },
          { label: 'Facturas emitidas', value: '142', icon: CreditCard },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">{item.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <item.icon size={18} />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-slate-800">Ingresos vs Gastos</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line dataKey="ingresos" name="Ingresos" stroke="#0284c7" strokeWidth={2} dot={{ r: 4 }} />
              <Line dataKey="gastos" name="Gastos" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-slate-800">Nuevos Pacientes</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="pacientes" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar pago o paciente"
            className="w-full rounded-xl border border-slate-200 bg-blue-50/50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="grid grid-cols-6 rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-500">
          <span>ID</span>
          <span>Paciente</span>
          <span>Concepto</span>
          <span>Monto</span>
          <span>Método</span>
          <span>Estado</span>
        </div>
        {filtered.map((item) => (
          <div key={item.id} className="grid grid-cols-6 border-b border-slate-200 px-3 py-3 text-sm">
            <span className="font-semibold text-slate-700">{item.id}</span>
            <span>{item.paciente}</span>
            <span>{item.concepto}</span>
            <span>{item.monto}</span>
            <span>{item.metodo}</span>
            <span>{item.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
