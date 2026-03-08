import { useState } from 'react'
import { Bell, Calendar, Save, Shield, Users, X } from 'lucide-react'

function Toggle({ initial = false }) {
  const [enabled, setEnabled] = useState(initial)
  return (
    <button
      type="button"
      onClick={() => setEnabled((prev) => !prev)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full p-0.5 transition-colors ${
        enabled ? 'bg-cyan-600' : 'bg-slate-300'
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={18} className="text-slate-700" />
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Item({ title, description, action }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  )
}

export default function Configuracion() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Configuración del sistema</h2>
        <p className="text-sm text-slate-500">Ajustes generales de operación clínica</p>
      </div>

      <div className="space-y-4">
        <Section icon={Bell} title="Notificaciones">
          <Item title="Alertas de stock bajo" description="Notificar cuando el inventario esté por debajo del mínimo" action={<Toggle initial />} />
          <Item title="Recordatorios de citas" description="Enviar recordatorios automáticos a pacientes" action={<Toggle initial />} />
          <Item title="Notificaciones de pago" description="Alertas por pagos pendientes y recibidos" action={<Toggle initial />} />
        </Section>

        <Section icon={Users} title="Personal y usuarios">
          <Item title="Gestión de roles" description="Permisos por rol de usuario" action={<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">Gestionar</button>} />
          <Item title="Usuarios activos" description="Administrar cuentas del sistema" action={<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">Ver usuarios</button>} />
        </Section>

        <Section icon={Calendar} title="Consultorios y horarios">
          <Item title="Horarios de atención" description="Rangos de disponibilidad por especialidad" action={<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">Configurar</button>} />
          <Item title="Duración de consulta" description="Duración estándar de cada cita" action={<span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">30 min</span>} />
        </Section>

        <Section icon={Shield} title="Seguridad">
          <Item title="Autenticación de dos factores" description="Agregar doble factor al inicio de sesión" action={<Toggle />} />
          <Item title="Cierre automático" description="Cerrar sesión tras inactividad" action={<Toggle initial />} />
          <Item title="Cambio de contraseña" description="Renovación de contraseña del usuario" action={<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">Cambiar</button>} />
        </Section>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
          <X size={14} />
          Cancelar
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">
          <Save size={14} />
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
