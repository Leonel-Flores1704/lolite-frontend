import { CalendarPlus, FilePlus2, UserPlus, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const cards = [
  {
    icon: UserPlus,
    label: 'Nuevo paciente',
    desc: 'Registrar expediente inicial',
    color: 'bg-cyan-100 text-cyan-700',
    path: '/pacientes/nuevo',
  },
  {
    icon: CalendarPlus,
    label: 'Nueva cita',
    desc: 'Agendar en consultorio',
    color: 'bg-blue-100 text-blue-700',
    path: '/citas/nueva',
  },
  {
    icon: FilePlus2,
    label: 'Nueva requisición',
    desc: 'Solicitar insumos',
    color: 'bg-sky-100 text-sky-700',
    path: '/requisiciones/nuevo',
  },
  {
    icon: BarChart3,
    label: 'Ir a reportes',
    desc: 'Ver analítica clínica',
    color: 'bg-indigo-100 text-indigo-700',
    path: '/reportes',
  },
]

export default function QuickAccess() {
  const navigate = useNavigate()

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.label}
          type="button"
          onClick={() => navigate(card.path)}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(15,23,42,0.08)]"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
            <card.icon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{card.label}</p>
            <p className="text-xs text-slate-500">{card.desc}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
