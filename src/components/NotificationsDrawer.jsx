import { BellRing, X } from 'lucide-react'

export default function NotificationsDrawer({ open, onClose }) {
    return (
        <>
            {open && (
                <button
                    type="button"
                    onClick={onClose}
                    className="fixed inset-0 bg-black/30 z-40"
                    aria-label="Cerrar notificaciones"
                />
            )}

            <aside
                className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BellRing size={18} className="text-cyan-600" />
                        <h3 className="font-bold text-gray-800">Notificaciones</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
                        title="Cerrar"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5">
                    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
                        <p className="font-semibold text-gray-700">Sin notificaciones por ahora</p>
                        <p className="text-sm text-gray-500 mt-1">
                            El panel esta listo para mostrar avisos cuando los recibas.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}

