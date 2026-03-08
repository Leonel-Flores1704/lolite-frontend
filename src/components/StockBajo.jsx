import { ChevronRight, AlertCircle, Pencil, Package, Syringe } from 'lucide-react'

const items = [
    { icon: Pencil, nombre: 'Paracetamol 500mg', disp: 6, min: 10, color: 'text-orange-400', bar: 'bg-orange-400', pct: 60 },
    { icon: Package, nombre: 'Penicilina', disp: 8, min: 50, color: 'text-red-500', bar: 'bg-red-500', pct: 16 },
    { icon: Syringe, nombre: 'Inyecciones', disp: 5, min: 14, color: 'text-red-500', bar: 'bg-red-500', pct: 35 },
]

export default function StockBajo() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Stock bajo</h3>
                <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                    <AlertCircle size={12} /> 3 alertas
                </span>
            </div>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.nombre} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center ${item.color}`}>
                            <item.icon size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">{item.nombre}</span>
                                <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
                                    <ChevronRight size={14} className="text-cyan-500" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                                    <div className={`h-1.5 rounded-full ${item.bar}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                                <span className="text-xs text-gray-400">{item.disp} disp. / {item.min} min</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}