import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { mes: 'Ene', pacientes: 800 },
    { mes: 'Feb', pacientes: 950 },
    { mes: 'Maz', pacientes: 870 },
    { mes: 'Abl', pacientes: 1050 },
    { mes: 'May', pacientes: 980 },
    { mes: 'Jun', pacientes: 1250 },
]

export default function TotalPacientes() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Total de pacientes</h3>
                <button className="text-xs bg-cyan-500 text-white px-3 py-1 rounded-full">Detalles</button>
            </div>
            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPacientes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="pacientes" stroke="#06b6d4" strokeWidth={2} fill="url(#colorPacientes)" dot={false} activeDot={{ r: 6 }} />
                </AreaChart>
            </ResponsiveContainer>
            <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">↑ Totales 1250</span>
            </div>
        </div>
    )
}