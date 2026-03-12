import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import NotificationsDrawer from './components/NotificationsDrawer'
import QuickAccess from './components/QuickAccess'
import TotalPacientes from './components/charts/TotalPacientes'
import CitasMes from './components/charts/CitasMes'
import ConsultasMeses from './components/charts/ConsultasMeses'
import IngresosEstimados from './components/charts/IngresosEstimados'
import ConsultasDia from './components/ConsultasDia'
import StockBajo from './components/StockBajo'
import Pacientes from './pages/Pacientes'
import NuevoPaciente from './pages/NuevoPaciente'
import Citas from './pages/Citas'
import NuevaCita from './pages/NuevaCita'
import Inventario from './pages/Inventario'
import NuevoProducto from './pages/NuevoProducto'
import Consultorios from './pages/Consultorios'
import NuevoConsultorio from './pages/NuevoConsultorio'
import Requisiciones from './pages/Requisiciones'
import NuevaRequisicion from './pages/NuevaRequisicion'
import Proveedores from './pages/Proveedores'
import NuevoProveedor from './pages/NuevoProveedor'
import Pagos from './pages/Pagos'
import Reportes from './pages/Reportes'
import Configuracion from './pages/Configuracion'
import Login from './pages/Login'
import { hasSession } from './utils/auth'

function ProtectedRoute({ children }) {
  if (!hasSession()) return <Navigate to="/login" replace />
  return children
}

function Dashboard() {
  return (
    <>
      <QuickAccess />
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <TotalPacientes />
        <CitasMes />
        <ConsultasMeses />
        <IngresosEstimados />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ConsultasDia />
        </div>
        <StockBajo />
      </div>
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  )
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className={`flex h-screen overflow-hidden ${isLoginRoute ? 'bg-slate-50' : 'bg-slate-100'}`}>
      {!isLoginRoute ? (
        <Sidebar
          collapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      ) : null}

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        {!isLoginRoute ? <Navbar onOpenNotifications={() => setNotificationsOpen(true)} /> : null}

        <main className={`flex-1 overflow-y-auto ${isLoginRoute ? '' : 'p-4 md:p-6'}`}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/pacientes" element={<ProtectedRoute><Pacientes /></ProtectedRoute>} />
            <Route path="/pacientes/nuevo" element={<ProtectedRoute><NuevoPaciente /></ProtectedRoute>} />
            <Route path="/citas" element={<ProtectedRoute><Citas /></ProtectedRoute>} />
            <Route path="/citas/nueva" element={<ProtectedRoute><NuevaCita /></ProtectedRoute>} />
            <Route path="/inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute>} />
            <Route path="/inventario/nuevo" element={<ProtectedRoute><NuevoProducto /></ProtectedRoute>} />
            <Route path="/consultorios" element={<ProtectedRoute><Consultorios /></ProtectedRoute>} />
            <Route path="/consultorios/nuevo" element={<ProtectedRoute><NuevoConsultorio /></ProtectedRoute>} />
            <Route path="/requisiciones" element={<ProtectedRoute><Requisiciones /></ProtectedRoute>} />
            <Route path="/requisiciones/nuevo" element={<ProtectedRoute><NuevaRequisicion /></ProtectedRoute>} />
            <Route path="/requisiciones/nueva" element={<ProtectedRoute><NuevaRequisicion /></ProtectedRoute>} />
            <Route path="/proveedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
            <Route path="/provedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
            <Route path="/proveedores/nuevo" element={<ProtectedRoute><NuevoProveedor /></ProtectedRoute>} />
            <Route path="/provedores/nuevo" element={<ProtectedRoute><NuevoProveedor /></ProtectedRoute>} />
            <Route path="/pagos" element={<ProtectedRoute><Pagos /></ProtectedRoute>} />
            <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
            <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
            <Route path="/login" element={hasSession() ? <Navigate to="/" replace /> : <Login />} />
            <Route path="*" element={<Navigate to={hasSession() ? '/' : '/login'} replace />} />
          </Routes>
        </main>
      </div>

      {!isLoginRoute ? (
        <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      ) : null}
    </div>
  )
}
