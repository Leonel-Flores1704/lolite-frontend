import { Clock, ChevronRight } from 'lucide-react'

const consultas = [
    { iniciales: 'LF', nombre: 'Leonel flores', hora: '09:10 AM', motivo: 'Fiebre alta', estado: 'Completada', color: 'bg-green-100 text-green-600' },
    { iniciales: 'RS', nombre: 'Roberto Solis', hora: '10:00 AM', motivo: 'Gripa', estado: 'Pendiente', color: 'bg-yellow-100 text-yellow-600' },
    { iniciales: 'AG', nombre: 'Andrés García', hora: '09:45 AM', motivo: 'Tos', estado: 'Cancelada', color: 'bg-red-100 text-red-600' },
]

export default function ConsultasDia() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Citas del dia</h3>
                <button className="text-xs bg-cyan-500 text-white px-3 py-1 rounded-full">Ver todas</button>
            </div>
            <div className="grid grid-cols-4 text-xs text-gray-400 font-medium mb-2 px-2 py-2 bg-blue-50 rounded-xl">
                <span>Paciente</span>
                <span>Horario</span>
                <span>Motivo</span>
                <span>Estado</span>
            </div>
            <div className="space-y-2">
                {consultas.map((c) => (
                    <div key={c.nombre} className="grid grid-cols-4 items-center bg-gray-50 rounded-xl px-2 py-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold">{c.iniciales}</div>
                            <span className="text-sm font-medium text-gray-700">{c.nombre}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock size={13} />
                            {c.hora}
                        </div>
                        <span className="text-sm text-gray-600">{c.motivo}</span>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.color}`}>{c.estado}</span>
                            <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
                                <ChevronRight size={14} className="text-cyan-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}