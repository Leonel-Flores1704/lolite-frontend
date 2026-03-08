import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  Check,
  Circle,
  Clock3,
  Download,
  Eye,
  Pencil,
  Search,
  Stethoscope,
  Trash2,
  User,
  UserPlus,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { readCollection } from '../utils/localStorage'

const basePatients = [
  {
    id: 1,
    expediente: 'EXP-1201',
    nombre: 'Leonel de la Cruz Flores',
    edad: 27,
    telefono: '618 123 4500',
    email: 'leoflrs73@gmail.com',
    ultimaConsulta: '12/02/2026',
    estado: 'Activo',
    tipoSangre: 'O+',
    doctorAsignado: 'Dr. Juan Pedro Ramírez',
    direccion: 'Av. Constitución 245, Durango',
  },
  {
    id: 2,
    expediente: 'EXP-1202',
    nombre: 'Marta Ruiz',
    edad: 29,
    telefono: '+52 55 3344 5566',
    email: 'marta.ruiz@email.com',
    ultimaConsulta: '01/03/2026',
    estado: 'Activo',
    tipoSangre: 'A+',
    doctorAsignado: 'Dra. Laura Torres',
    direccion: 'Col. Reforma 80, Durango',
  },
  {
    id: 3,
    expediente: 'EXP-1203',
    nombre: 'Roberto Solis',
    edad: 32,
    telefono: '618 222 3344',
    email: 'roberto.solis@email.com',
    ultimaConsulta: '25/12/2025',
    estado: 'Activo',
    tipoSangre: 'O+',
    doctorAsignado: 'Dr. Juan Pedro Ramírez',
    direccion: 'Col. Centro, Durango',
    alergias: 'Ibuprofeno',
  },
  {
    id: 4,
    expediente: 'EXP-1204',
    nombre: 'Andrés García',
    edad: 27,
    telefono: '618 111 2223',
    email: 'andres.garcia@email.com',
    ultimaConsulta: '25/12/2025',
    estado: 'Activo',
    tipoSangre: 'O+',
    doctorAsignado: 'Dra. Laura Torres',
    direccion: 'Col. Jardines, Durango',
    alergias: 'Penicilina',
  },
  {
    id: 5,
    expediente: 'EXP-1205',
    nombre: 'Luis Flores',
    edad: 41,
    telefono: '618 445 7788',
    email: 'luis.flores@email.com',
    ultimaConsulta: '24/12/2025',
    estado: 'Activo',
    tipoSangre: 'A+',
    doctorAsignado: 'Dr. Carlos Mendoza',
    direccion: 'Col. Valle, Durango',
    alergias: 'Latex',
  },
  {
    id: 6,
    expediente: 'EXP-1206',
    nombre: 'María Torres',
    edad: 36,
    telefono: '618 990 1122',
    email: 'maria.torres@email.com',
    ultimaConsulta: '23/12/2025',
    estado: 'Activo',
    tipoSangre: 'B+',
    doctorAsignado: 'Dra. María González',
    direccion: 'Col. Reforma, Durango',
    alergias: 'Sin alergias',
  },
  {
    id: 7,
    expediente: 'EXP-1207',
    nombre: 'Carla Pineda',
    edad: 29,
    telefono: '618 004 2233',
    email: 'carla.pineda@email.com',
    ultimaConsulta: '22/12/2025',
    estado: 'Inactivo',
    tipoSangre: 'AB+',
    doctorAsignado: 'Dr. Juan Pedro Ramírez',
    direccion: 'Col. Las Rosas, Durango',
    alergias: 'Amoxicilina',
  },
  {
    id: 8,
    expediente: 'EXP-1208',
    nombre: 'José Ramírez',
    edad: 54,
    telefono: '618 333 2211',
    email: 'jose.ramirez@email.com',
    ultimaConsulta: '21/12/2025',
    estado: 'Activo',
    tipoSangre: 'O-',
    doctorAsignado: 'Dr. Carlos Mendoza',
    direccion: 'Col. Alameda, Durango',
    alergias: 'Sin alergias',
  },
]

const TABS = [
  { id: 'info', label: 'Información' },
  { id: 'historial', label: 'Historial' },
  { id: 'alergias', label: 'Alergias' },
  { id: 'recetas', label: 'Recetas' },
]

function PatientModal({ patient, onClose }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')
  if (!patient) return null

  const historyItems = [
    { id: 1, fecha: '12 Feb 2026 - 10:30', estado: 'Atendida' },
    { id: 2, fecha: '04 Feb 2026 - 12:10', estado: 'Atendida' },
    { id: 3, fecha: '25 Ene 2026 - 09:00', estado: 'Atendida' },
    { id: 4, fecha: '18 Ene 2026 - 16:20', estado: 'Cancelada' },
  ]

  const recetaItems = [
    {
      id: 1,
      fecha: '12 Feb 2026 - 10:30',
      titulo: 'Paracetamol 500mg',
      detalle: '1 tableta cada 8h · 5 dias · Dr. Juan Pedro',
    },
    {
      id: 2,
      fecha: '8 Abr 2026 - 10:00',
      titulo: 'Salbutamol Inhalador',
      detalle: '2 puff cada 6 hrs al necesitar · Uso permanente · Dr. Juan Pedro Ramirez',
    },
    {
      id: 3,
      fecha: '4 Noc 2026 - 08:00',
      titulo: 'Amoxicilina 500mg',
      detalle: '1 capsula cada 8 hrs · 7 dias · Dr. Juan Pedro Ramirez',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-slate-900/35" aria-label="Cerrar" />
      <div className="relative flex h-[92vh] w-full max-w-[460px] flex-col overflow-hidden rounded-2xl border border-[#bfd3df] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#bfd3df] bg-[#f1f7fb] px-4 py-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {patient.nombre
                .split(' ')
                .slice(0, 2)
                .map((x) => x[0])
                .join('')}
            </div>
            <div>
              <h3 className="text-[23px] leading-tight font-normal text-slate-900">{patient.nombre}</h3>
              <p className="text-xs font-normal text-slate-400">
                #{patient.expediente || 'EXP-215'} · {patient.tipoSangre || 'O+'} · {patient.doctorAsignado || 'Dr. Juan Pedro'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#9eb7c8] bg-[#eaf4f8] text-slate-500 hover:bg-[#dfeff6]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-4 border-b border-[#b9ceda] bg-[#edf5fa]">
          {TABS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setTab(entry.id)}
              className={`border-b-[3px] py-2.5 text-[15px] font-normal transition-colors ${
                tab === entry.id ? 'border-[#0696cc] text-[#0696cc]' : 'border-transparent text-slate-800'
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8fbfd] px-4 py-4 text-sm text-slate-700">
          {tab === 'info' ? (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs font-normal text-[#98afbe] uppercase">DATOS PERSONALES</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="col-span-1">
                    <p className="text-[#9ab0be]">Nombre completo</p>
                    <p className="font-normal text-slate-900">{patient.nombre}</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">No. Expediente</p>
                    <p className="font-normal text-slate-900">#{patient.expediente || 'EXP-001'}</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Fecha de nacimiento</p>
                    <p className="font-normal text-slate-900">14 Mar 1998</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Edad</p>
                    <p className="font-normal text-slate-900">{patient.edad || 27}</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Sexo</p>
                    <p className="font-normal text-slate-900">Masculino</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Tipo de sangre</p>
                    <span className="rounded-md border border-red-300 bg-red-50 px-2 py-0.5 text-xs font-normal text-red-500">
                      {patient.tipoSangre || 'O+'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#9ab0be]">Telefono</p>
                    <p className="font-normal text-slate-900">{patient.telefono}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#9ab0be]">Direccion</p>
                    <p className="font-normal text-slate-900">{patient.direccion || 'Sin registro'}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-normal text-[#98afbe] uppercase">ANTECEDENTES MEDICOS</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#9ab0be]">Enfermedades cronicas</p>
                    <p className="font-normal text-slate-900">Asma leve, Hipertension en seguimiento</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Antecedentes familiares</p>
                    <p className="font-normal text-slate-900">Diabetes tipo 2 (padre), HTA (madre)</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-normal text-[#98afbe] uppercase">DOCTOR ASIGNADO</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="text-[#9ab0be]">Doctor que atendio</p>
                    <p className="font-normal text-slate-900">{patient.doctorAsignado || 'Dr. Juan Pedro Ramirez'}</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Especialidad</p>
                    <p className="font-normal text-slate-900">Medicina General</p>
                  </div>
                  <div>
                    <p className="text-[#9ab0be]">Fecha de registro</p>
                    <p className="font-normal text-slate-900">03 Ene 2024</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {tab === 'historial' ? (
            <div>
              <p className="mb-3 text-xs font-normal text-[#98afbe] uppercase">CONSULTAS ANTERIORES</p>
              <div className="space-y-3">
                {historyItems.map((item) => {
                  const canceled = item.estado === 'Cancelada'
                  return (
                    <article key={item.id} className="rounded-2xl border border-[#9eb7c8] bg-white p-3">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-sm font-normal text-[#9ab0be]">{item.fecha}</p>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-normal ${
                            canceled ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {canceled ? <Circle size={12} /> : <Check size={12} />} {item.estado}
                        </span>
                      </div>
                      <p className="text-base font-normal text-slate-900">Fiebre alta y malestar general</p>
                      <p className="text-sm font-normal text-[#8ca5b7]">Dr. Juan Pedro Ramirez · Consultorio 1</p>
                      <div className="my-2 border-t border-dashed border-[#9eb7c8]" />
                      <p className="text-sm font-normal text-slate-900">
                        Diagnostico: <span className="font-normal text-[#8ca5b7]">Infeccion viral de vias respiratorias altas. Se prescribio Paracetamol 500mg y reposo.</span>
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>
          ) : null}

          {tab === 'alergias' ? (
            <div>
              <p className="mb-3 text-xs font-normal text-[#98afbe] uppercase">ALERGIAS REGISTRADAS</p>
              <div className="space-y-3">
                <article className="rounded-2xl border border-amber-400/80 bg-amber-50 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-lg font-normal text-amber-700">Penicilina</p>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-normal text-amber-600">Reaccion moderada</span>
                  </div>
                  <p className="text-sm font-normal text-amber-700">Urticaria generalizada y dificultad para respirar. Detectada en consulta Ene 2024.</p>
                </article>

                <article className="rounded-2xl border border-red-400/80 bg-red-50 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-lg font-normal text-red-700">Aspirina</p>
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-normal text-red-600">Reaccion severa</span>
                  </div>
                  <p className="text-sm font-normal text-red-700">Urticaria generalizada y dificultad para respirar. Detectada en consulta Ene 2024.</p>
                </article>

                <article className="rounded-2xl border border-emerald-500 bg-emerald-50 p-4">
                  <p className="flex items-start gap-2 text-sm font-normal text-emerald-700">
                    <Check className="mt-0.5 shrink-0" size={18} />
                    Sin alergias a medicamentos de uso comun (paracetamol, amoxicilina)
                  </p>
                </article>
              </div>
            </div>
          ) : null}

          {tab === 'recetas' ? (
            <div>
              <p className="mb-3 text-xs font-normal text-[#98afbe] uppercase">RECETAS GENERADAS</p>
              <div className="space-y-3">
                {recetaItems.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-[#9eb7c8] bg-white p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <p className="text-sm font-normal text-[#9ab0be]">{item.fecha}</p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-cyan-100 px-3 py-1 text-xs font-normal text-cyan-700 hover:bg-cyan-200"
                      >
                        <Download size={12} /> Descargar Receta
                      </button>
                    </div>
                    <p className="text-lg font-normal text-slate-900">{item.titulo}</p>
                    <p className="text-sm font-normal text-[#8ca5b7]">{item.detalle}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[#bfd3df] bg-[#f1f7fb] p-3">
          <button
            type="button"
            onClick={() => navigate('/citas/nueva')}
            className="rounded-xl border border-[#c3dae6] bg-[#e6f1f7] px-2 py-2.5 text-sm font-normal text-slate-700 hover:bg-[#dbeaf3]"
          >
            Agendar cita
          </button>
          <button type="button" className="rounded-xl border border-[#c3dae6] bg-[#e6f1f7] px-2 py-2.5 text-sm font-normal text-slate-700 hover:bg-[#dbeaf3]">
            Nueva receta
          </button>
          <button type="button" className="rounded-xl border border-[#c3dae6] bg-[#e6f1f7] px-2 py-2.5 text-sm font-normal text-slate-700 hover:bg-[#dbeaf3]">
            Editar expediente
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Pacientes() {
  const navigate = useNavigate()
  const savedPatients = readCollection('pacientes_registrados', [])
  const patients = useMemo(() => [...savedPatients, ...basePatients], [savedPatients])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () => patients.filter((item) => item.nombre.toLowerCase().includes(search.toLowerCase())),
    [patients, search],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de pacientes</h2>
          <p className="text-sm text-slate-500">Administra historiales y datos clínicos</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/pacientes/nuevo')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Nuevo paciente
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total pacientes', value: patients.length, icon: Users, color: 'bg-blue-100 text-blue-700' },
          { label: 'Activos', value: patients.filter((p) => p.estado === 'Activo').length, icon: UserRound, color: 'bg-green-100 text-green-700' },
          { label: 'Nuevos este mes', value: savedPatients.length, icon: UserPlus, color: 'bg-cyan-100 text-cyan-700' },
          { label: 'Consultas semanales', value: 18, icon: CalendarDays, color: 'bg-indigo-100 text-indigo-700' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="pt-1">
          <p className="mb-3 text-lg font-semibold text-slate-400">
            Mostrando <span className="text-slate-700">{filtered.length}</span> de <span className="text-slate-800">{patients.length}</span> pacientes
          </p>

          <div className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_160px_160px_160px_86px]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar pacientes, telefono, etc."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Todos los doctores</button>
            <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Tipo de sangre</button>
            <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Recientes</button>
            <button type="button" className="rounded-xl bg-cyan-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">Exportar</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1120px]">
            <div className="grid grid-cols-[44px_1.35fr_1fr_1fr_1fr_1fr_1fr_120px] rounded-2xl bg-blue-50 px-3 py-3 text-xs font-semibold text-slate-500">
              <span>
                <input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" />
              </span>
              <span>Paciente</span>
              <span>Edad / sexo</span>
              <span>Tipo de sangre</span>
              <span>Telefono</span>
              <span>Ultima vista</span>
              <span>Alergias</span>
              <span>Acciones</span>
            </div>

            {filtered.map((patient, idx) => (
              <div
                key={`${patient.expediente}-${patient.id}-${idx}`}
                className="grid grid-cols-[44px_1.35fr_1fr_1fr_1fr_1fr_1fr_120px] items-center border-b border-slate-200 px-3 py-3 text-sm"
              >
                <span>
                  <input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" />
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                    {patient.nombre.split(' ').slice(0, 2).map((x) => x[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{patient.nombre}</p>
                    <p className="text-xs text-slate-400">#{patient.expediente || 'EXP-001'}</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-slate-800">{patient.edad} años</p>
                  <p className="text-xs text-slate-400">Masculino</p>
                </div>

                <span>
                  <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-500">
                    {patient.tipoSangre || 'O+'}
                  </span>
                </span>

                <span className="text-slate-700">{patient.telefono}</span>

                <div>
                  <p className="text-slate-800">{patient.ultimaConsulta || '25 DIC 2025'}</p>
                  <p className="text-xs text-slate-400">Hoy</p>
                </div>

                <span>
                  <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                    {patient.alergias || 'Sin alergias'}
                  </span>
                </span>

                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => setSelected(patient)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Eye size={13} className="text-cyan-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Trash2 size={13} className="text-cyan-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Pencil size={13} className="text-cyan-600" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PatientModal patient={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
