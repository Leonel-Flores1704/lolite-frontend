import { useState } from 'react'
import { DollarSign, Users, Calendar, FileText, Download, Eye, Filter } from 'lucide-react'
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const ingresosData = [
    { mes: 'Ene', ingresos: 11000, gastos: 8500 },
    { mes: 'Feb', ingresos: 14500, gastos: 9200 },
    { mes: 'Mar', ingresos: 16500, gastos: 10000 },
    { mes: 'Abr', ingresos: 15000, gastos: 9800 },
    { mes: 'May', ingresos: 18500, gastos: 10500 },
    { mes: 'Jun', ingresos: 21500, gastos: 11000 },
]

const pacientesData = [
    { mes: 'Ene', pacientes: 45 },
    { mes: 'Feb', pacientes: 52 },
    { mes: 'Mar', pacientes: 49 },
    { mes: 'Abr', pacientes: 61 },
    { mes: 'May', pacientes: 55 },
    { mes: 'Jun', pacientes: 63 },
]

const citasData = [
    { name: 'Completadas', value: 320, pct: 67, color: '#10b981' },
    { name: 'Pendientes', value: 85, pct: 18, color: '#f59e0b' },
    { name: 'Canceladas', value: 45, pct: 9, color: '#ef4444' },
    { name: 'Reprogramadas', value: 28, pct: 6, color: '#8b5cf6' },
]

const reportes = [
    { titulo: 'Reporte Financiero Mensual', desc: 'Resumen de ingresos y gastos del mes actual', tags: ['Finanzas', 'PDF'], fecha: '25/02/2026' },
    { titulo: 'Estadísticas de Pacientes', desc: 'Análisis demográfico y de atención de pacientes', tags: ['Pacientes', 'Excel'], fecha: '24/02/2026' },
    { titulo: 'Reporte de Inventario', desc: 'Estado actual del inventario y alertas de stock', tags: ['Inventario', 'PDF'], fecha: '23/02/2026' },
    { titulo: 'Reporte de Citas', desc: 'Análisis de citas atendidas, canceladas y pendientes', tags: ['Citas', 'PDF'], fecha: '22/02/2026' },
]

const RADIAN = Math.PI / 180
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, pct }) => {
    const radius = outerRadius + 30
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
        <text x={x} y={y} fill="#6b7280" textAnchor={x > cx ? 'start' : 'end'} fontSize={11}>
            {`${name} ${pct}%`}
        </text>
    )
}

export default function Reportes() {
    const [periodo, setPeriodo] = useState('Mes')

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Reportes y Análisis</h2>
                    <p className="text-sm text-gray-400">Visualiza estadísticas y genera reportes del sistema</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                        <Filter size={14} /> Filtrar Período
                    </button>
                    <button className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-cyan-600">
                        <Download size={14} /> Exportar Todos
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Ingresos Totales', valor: '$103,000', badge: '+12%', icon: DollarSign, color: 'bg-green-50 text-green-500' },
                    { label: 'Total Pacientes', valor: '323', badge: '+8%', icon: Users, color: 'bg-blue-50 text-blue-500' },
                    { label: 'Consultas Mes', valor: '527', badge: '+15%', icon: Calendar, color: 'bg-purple-50 text-purple-500' },
                    { label: 'Reportes Generados', valor: '24', badge: '+3', icon: FileText, color: 'bg-orange-50 text-orange-500' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">{s.label}</p>
                            <p className="text-xl font-bold text-gray-800">{s.valor}</p>
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">{s.badge}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                            <s.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Período selector */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Período de Análisis</h3>
                <div className="flex gap-1">
                    {['Semana', 'Mes', 'Trimestre', 'Año'].map(p => (
                        <button key={p} onClick={() => setPeriodo(p)}
                            className={`text-sm px-4 py-1.5 rounded-xl transition-colors ${periodo === p ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gráficas fila 1 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Ingresos vs Gastos */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Ingresos vs Gastos</h3>
                        <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <Download size={12} /> Exportar
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={ingresosData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend iconType="circle" iconSize={8} />
                            <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Ingresos" />
                            <Line type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Gastos" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Total Ingresos</p>
                            <p className="text-sm font-bold text-green-500">$103,000</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Total Gastos</p>
                            <p className="text-sm font-bold text-red-500">$59,500</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Balance</p>
                            <p className="text-sm font-bold text-cyan-500">$43,500</p>
                        </div>
                    </div>
                </div>

                {/* Nuevos Pacientes */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Nuevos Pacientes</h3>
                        <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <Download size={12} /> Exportar
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={pacientesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Bar dataKey="pacientes" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Pacientes" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Promedio Mensual</p>
                            <p className="text-sm font-bold text-cyan-500">54</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Total 6 Meses</p>
                            <p className="text-sm font-bold text-cyan-500">323</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráficas fila 2 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Distribución de Citas */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Distribución de Citas</h3>
                        <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <Download size={12} /> Exportar
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={citasData} cx="50%" cy="50%" outerRadius={80}
                                dataKey="value" labelLine={true} label={renderCustomLabel}>
                                {citasData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-3 mt-2 pt-3 border-t border-gray-100">
                        {citasData.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                                <div>
                                    <p className="text-xs text-gray-500">{c.name}</p>
                                    <p className="text-sm font-bold text-gray-700">{c.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Medicamentos Recetados */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Top Medicamentos Recetados</h3>
                        <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-50">
                            <Download size={12} /> Exportar
                        </button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { nombre: 'Paracetamol 500mg', recetas: 214, pct: 92, color: 'bg-cyan-400' },
                            { nombre: 'Amoxicilina 500mg', recetas: 178, pct: 76, color: 'bg-blue-400' },
                            { nombre: 'Ibuprofeno 400mg', recetas: 156, pct: 67, color: 'bg-purple-400' },
                            { nombre: 'Salbutamol Inhalador', recetas: 98, pct: 42, color: 'bg-green-400' },
                            { nombre: 'Insulina Rápida', recetas: 74, pct: 32, color: 'bg-orange-400' },
                            { nombre: 'Omeprazol 20mg', recetas: 61, pct: 26, color: 'bg-pink-400' },
                        ].map((m, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                                        <span className="text-sm text-gray-700">{m.nombre}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500">{m.recetas} recetas</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-2 rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Total Recetas</p>
                            <p className="text-sm font-bold text-cyan-500">781</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Promedio Diario</p>
                            <p className="text-sm font-bold text-cyan-500">26</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400">Este Mes</p>
                            <p className="text-sm font-bold text-cyan-500">Feb 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reportes generados */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Reportes Generados</h3>
                <div className="space-y-1">
                    {reportes.map((r, i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                                    <FileText size={18} className="text-cyan-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{r.titulo}</p>
                                    <p className="text-xs text-gray-400 mb-1">{r.desc}</p>
                                    <div className="flex gap-1">
                                        {r.tags.map((tag, j) => (
                                            <span key={j} className="text-xs border border-gray-200 px-2 py-0.5 rounded-lg text-gray-600">{tag}</span>
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">{r.fecha}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                    <Eye size={13} /> Ver
                                </button>
                                <button className="flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                    <Download size={13} /> Descargar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
