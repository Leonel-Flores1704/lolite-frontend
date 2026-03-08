import { ChevronLeft, ChevronRight } from 'lucide-react'

const days = ['Dom', 'Lun', 'Mar', 'Mier', 'Juev', 'Vier', 'Sab']

const calendar = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, null, null, null, null, null, null],
]

export default function CitasMes() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Citas del mes <span className="text-cyan-500">6</span></h3>
                <div className="flex gap-1">
                    <button className="p-1 rounded-full hover:bg-gray-100"><ChevronLeft size={16} /></button>
                    <button className="p-1 rounded-full hover:bg-gray-100"><ChevronRight size={16} /></button>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">Marzo</p>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 text-center mb-1">
                {days.map(d => (
                    <span key={d} className="text-xs text-gray-400 font-medium">{d}</span>
                ))}
            </div>

            {/* Números */}
            <div className="space-y-1">
                {calendar.map((week, i) => (
                    <div key={i} className="grid grid-cols-7 text-center">
                        {week.map((day, j) => (
                            <span key={j} className={`text-xs py-1 rounded-full w-7 h-7 flex items-center justify-center mx-auto
                ${day === 23 ? 'bg-cyan-500 text-white font-bold' : ''}
                ${day === 11 ? 'border border-orange-400 text-orange-400' : ''}
                ${day === 12 ? 'border border-cyan-400 text-cyan-400' : ''}
                ${day === 15 ? 'bg-red-100 text-red-500' : ''}
                ${day === 27 || day === 28 ? 'text-gray-300' : 'text-gray-600'}
                ${!day ? 'invisible' : ''}
              `}>
                                {day}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mt-3">
                <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium">✦ 2 pendientes</span>
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">✔ 1 completadas</span>
            </div>
        </div>
    )
}