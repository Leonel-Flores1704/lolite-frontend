import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LoginInput({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  showToggle = false,
  visible = false,
  onToggle,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-[#006191]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showToggle ? (visible ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-xl border border-transparent bg-[#EEF7FB] px-10 py-3 text-sm text-slate-700 placeholder:text-[#1C7EA6] focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#1C7EA6]" />
        {showToggle ? (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C7EA6]"
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(form),
      })

      const contentType = response.headers.get('content-type') || ''
      const payload = contentType.includes('application/json')
        ? await response.json()
        : { message: 'Respuesta no válida del servidor' }

      if (!response.ok) {
        setError(payload?.message || payload?.errors?.email?.[0] || 'Credenciales inválidas')
        return
      }

      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user || {}))
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Leolite · Gestión médica</p>
          <h1 className="mt-2 text-2xl font-bold text-[#006191]">Bienvenido de nuevo</h1>
          <p className="mt-1 text-sm text-slate-500">Inicia sesión para continuar</p>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="space-y-4">
          <LoginInput
            id="login-email"
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="Ingresa tu correo"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            icon={Mail}
          />
          <LoginInput
            id="login-password"
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            icon={Lock}
            showToggle
            visible={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#0484AF] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#036F95] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}
