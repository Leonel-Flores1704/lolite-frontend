import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
    { mes: 'Ene', value: 10 },
    { mes: 'Feb', value: 20 },
    { mes: 'Maz', value: 30 },
    { mes: 'Abl', value: 40 },
    { mes: 'May', value: 50 },
]

export default function ConsultasMeses() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Consultas Por meses</h3>
                <button className="text-xs bg-cyan-500 text-white px-3 py-1 rounded-full">Ver Reporte</button>
            </div>
            <div className="flex gap-2 mb-3">
                <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">2026</span>
                <span className="text-xs text-gray-400 px-2 py-1">2025</span>
                <span className="text-xs text-gray-400 px-2 py-1">2024</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data}>
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    {data.map((entry, index) => null)}
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={index === data.length - 1 ? '#0e3a5c' : '#a5d8f3'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">↑ +18%</span>
                <span className="text-xs text-gray-400">vs mes anterior</span>
            </div>
        </div>
    )
}