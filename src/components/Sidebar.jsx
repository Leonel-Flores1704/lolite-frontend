import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  CalendarPlus,
  Package,
  PackagePlus,
  Building2,
  Stethoscope,
  ClipboardList,
  ClipboardPlus,
  Truck,
  CirclePlus,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const menuGroups = [
  {
    section: 'PRINCIPAL',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      {
        icon: Users,
        label: 'Pacientes',
        path: '/pacientes',
        children: [{ icon: UserPlus, label: 'Nuevo paciente', path: '/pacientes/nuevo' }],
      },
      {
        icon: Calendar,
        label: 'Citas',
        path: '/citas',
        children: [{ icon: CalendarPlus, label: 'Nueva cita', path: '/citas/nueva' }],
      },
    ],
  },
  {
    section: 'GESTION',
    items: [
      {
        icon: Package,
        label: 'Inventario',
        path: '/inventario',
        children: [{ icon: PackagePlus, label: 'Nuevo producto', path: '/inventario/nuevo' }],
      },
      {
        icon: Building2,
        label: 'Consultorios',
        path: '/consultorios',
        children: [{ icon: Stethoscope, label: 'Nuevo consultorio', path: '/consultorios/nuevo' }],
      },
      {
        icon: ClipboardList,
        label: 'Requisiciones',
        path: '/requisiciones',
        children: [{ icon: ClipboardPlus, label: 'Nueva requisición', path: '/requisiciones/nuevo' }],
      },
      {
        icon: Truck,
        label: 'Proveedores',
        path: '/proveedores',
        children: [{ icon: CirclePlus, label: 'Nuevo proveedor', path: '/proveedores/nuevo' }],
      },
    ],
  },
  {
    section: 'FINANZAS',
    items: [
      { icon: CreditCard, label: 'Pagos', path: '/pagos' },
      { icon: BarChart2, label: 'Reportes', path: '/reportes' },
      { icon: Settings, label: 'Configuración', path: '/configuracion' },
    ],
  },
]

function isPathActive(pathname, path) {
  return pathname === path || pathname.startsWith(`${path}/`)
}

function getInitialOpenState(pathname) {
  const open = {}
  menuGroups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.children?.length) {
        open[item.path] = isPathActive(pathname, item.path)
      }
    })
  })
  return open
}

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState(() => getInitialOpenState(location.pathname))
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    setOpenMenus((prev) => {
      const next = { ...prev }
      menuGroups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.children?.length && isPathActive(location.pathname, item.path)) {
            next[item.path] = true
          }
        })
      })
      return next
    })
  }, [location.pathname])

  const initials =
    user?.nombre?.[0] && user?.apellido?.[0] ? `${user.nombre[0]}${user.apellido[0]}` : 'DR'

  const logout = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
      }
    } catch {
      // Continúa con logout local.
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login', { replace: true })
    }
  }

  return (
    <aside
      className={`${
        collapsed ? 'w-[88px]' : 'w-[272px]'
      } sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden bg-[#101828] text-white transition-all duration-300`}
    >
      <div className="border-b border-[#1a2b49] px-4 py-4">
        <div className={`flex items-center ${collapsed ? 'justify-start gap-2' : 'justify-between'}`}>
          {collapsed ? (
            <>
              <button
                type="button"
                onClick={onToggle}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d1f3f] text-cyan-300 hover:bg-[#132a53]"
                title="Expandir sidebar"
              >
                <Menu size={18} />
              </button>
              <span className="text-4xl font-bold leading-none">
                <span className="text-cyan-300">L</span>
                <span className="text-cyan-400">e</span>
              </span>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  <span className="text-cyan-300">Le</span>olite
                </h1>
                <p className="text-xs text-slate-400">Gestión médica</p>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d1f3f] text-cyan-300 hover:bg-[#132a53]"
                title="Colapsar sidebar"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <nav className={`sidebar-nav-scroll flex-1 overflow-y-auto ${collapsed ? 'px-2 py-3' : 'px-3 py-3'}`}>
        <div className="space-y-6">
          {menuGroups.map((group) => (
            <section key={group.section}>
              <p
                className={`mb-2 text-[11px] font-semibold tracking-wider text-slate-400 ${
                  collapsed ? 'px-0 text-center' : 'px-2'
                }`}
              >
                {group.section}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const hasChildren = Boolean(item.children?.length)
                  const active = hasChildren
                    ? location.pathname === item.path
                    : isPathActive(location.pathname, item.path)
                  const expanded = Boolean(openMenus[item.path])

                  return (
                    <li key={item.path}>
                      <div
                        className={`flex items-center rounded-xl transition-colors ${
                          active ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/40' : 'text-slate-300 hover:bg-[#122342] hover:text-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => navigate(item.path)}
                          title={collapsed ? item.label : ''}
                          className={`flex flex-1 items-center px-3 py-2 text-sm ${
                            collapsed ? 'justify-center' : 'gap-3 text-left'
                          }`}
                        >
                          <item.icon size={18} />
                          {!collapsed ? <span>{item.label}</span> : null}
                        </button>

                        {!collapsed && hasChildren ? (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenus((prev) => ({ ...prev, [item.path]: !prev[item.path] }))
                            }
                            className="mr-2 flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-[#1a315a] hover:text-slate-200"
                            title={expanded ? 'Ocultar submenú' : 'Mostrar submenú'}
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                        ) : null}
                      </div>

                      {!collapsed && hasChildren && expanded ? (
                        <ul className="mt-1 space-y-1 pl-9">
                          {item.children.map((child) => {
                            const childActive = location.pathname === child.path
                            return (
                              <li key={child.path}>
                                <button
                                  type="button"
                                  onClick={() => navigate(child.path)}
                                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                                    childActive
                                      ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-500/30'
                                      : 'text-slate-400 hover:bg-[#122342] hover:text-slate-200'
                                  }`}
                                >
                                  <child.icon size={13} />
                                  <span>{child.label}</span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </nav>

      <div className="border-t border-[#1a2b49] p-3">
        {!collapsed ? (
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-100">
                {user?.nombre ? `Dr. ${user.nombre}` : 'Doctor'}
              </p>
              <p className="truncate text-xs text-slate-400">{user?.rol || 'Administrador'}</p>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={logout}
          title="Cerrar sesión"
          className={`flex w-full items-center justify-center rounded-xl bg-cyan-600 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 ${
            collapsed ? 'h-12 rounded-2xl' : 'gap-2 py-2.5'
          }`}
        >
          <LogOut size={collapsed ? 22 : 16} />
          {!collapsed ? <span>Cerrar sesión</span> : null}
        </button>
      </div>
    </aside>
  )
}
