import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { mes: 'Ene', value: 10000 },
    { mes: 'Feb', value: 15000 },
    { mes: 'Maz', value: 12000 },
    { mes: 'Abl', value: 20000 },
    { mes: 'May', value: 35000 },
    { mes: 'Jun', value: 48000 },
]

export default function IngresosEstimados() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Ingresos Estimados</h3>
                <button className="text-xs bg-cyan-500 text-white px-3 py-1 rounded-full">Ver Reporte</button>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-3">5841,58</p>
            <ResponsiveContainer width="100%" height={130}>
                <LineChart data={data}>
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">↑ +58</span>
                <span className="text-xs text-gray-400">vs mes anterior</span>
            </div>
        </div>
    )
}