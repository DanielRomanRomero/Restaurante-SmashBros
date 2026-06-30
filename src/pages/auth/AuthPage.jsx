import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(loginEmail, loginPassword)
    if (error) setError(error.message)
    setLoading(false)
  }

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    const { error } = await signUp(signupEmail, signupPassword, signupName)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('¡Cuenta creada! Revisa tu correo para confirmar la cuenta.')
    }
    setLoading(false)
  }

  async function handleGoogle(e) {
    e.preventDefault()
    await signInWithGoogle()
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left panel — decorative */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900"
          alt="Burger"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/20 to-transparent" />
        <div className="relative z-10 p-16 flex flex-col justify-end">
          <div className="w-16 h-16 bg-surface-container border border-outline-variant/30 rounded-xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined filled text-primary-container text-[3.2rem]">local_fire_department</span>
          </div>
          <h2 className="font-montserrat text-headline-xl text-on-surface leading-tight">
            EL MEJOR<br /><span className="text-primary-container">SMASH</span><br />DE LA CIUDAD
          </h2>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-surface-container border border-outline-variant/30 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined filled text-primary-container text-[2.4rem]">local_fire_department</span>
            </div>
            <span className="font-montserrat font-extrabold text-headline-lg-mobile text-on-surface">
              Smash <span className="text-primary-container">Bros</span>
            </span>
          </div>

          <h1 className="font-montserrat font-bold text-headline-md text-on-surface mb-2">
            {activeTab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="text-body-md text-on-surface-variant mb-8">
            {activeTab === 'login' ? 'Accede para reservar tu mesa' : 'Únete a la familia Smash Bros'}
          </p>

          {/* Tabs */}
          <div className="flex border-b border-outline-variant/30 mb-8">
            {[{ id: 'login', label: 'Entrar' }, { id: 'signup', label: 'Crear cuenta' }].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setError(''); setSuccess('') }}
                className={`flex-1 pb-3 text-label-md transition-all ${
                  activeTab === tab.id
                    ? 'text-primary-container border-b-2 border-primary-container -mb-px'
                    : 'text-on-surface-variant'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Error / success messages */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-error bg-error/10 border border-error/30 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-[1.8rem]">error</span>
              <p className="text-body-md">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 flex items-center gap-2 text-secondary-container bg-secondary-container/10 border border-secondary-container/30 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-[1.8rem]">check_circle</span>
              <p className="text-body-md">{success}</p>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="email"
                  id="login-email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-outline-variant/50 focus:border-primary-container text-body-md text-on-surface pt-6 pb-2 outline-none transition-colors"
                />
                <label htmlFor="login-email" className="absolute left-0 top-0 text-label-md text-on-surface-variant peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-0 peer-focus:text-label-md peer-focus:text-primary-container transition-all">
                  Correo electrónico
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="login-password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-outline-variant/50 focus:border-primary-container text-body-md text-on-surface pt-6 pb-2 outline-none transition-colors"
                />
                <label htmlFor="login-password" className="absolute left-0 top-0 text-label-md text-on-surface-variant peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-0 peer-focus:text-label-md peer-focus:text-primary-container transition-all">
                  Contraseña
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-surface font-semibold text-label-md py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-glow-active transition-all disabled:opacity-60"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="signup-name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-outline-variant/50 focus:border-primary-container text-body-md text-on-surface pt-6 pb-2 outline-none transition-colors"
                />
                <label htmlFor="signup-name" className="absolute left-0 top-0 text-label-md text-on-surface-variant peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-0 peer-focus:text-label-md peer-focus:text-primary-container transition-all">
                  Nombre completo
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="signup-email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b-2 border-outline-variant/50 focus:border-primary-container text-body-md text-on-surface pt-6 pb-2 outline-none transition-colors"
                />
                <label htmlFor="signup-email" className="absolute left-0 top-0 text-label-md text-on-surface-variant peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-0 peer-focus:text-label-md peer-focus:text-primary-container transition-all">
                  Correo electrónico
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="signup-password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  placeholder=" "
                  required
                  minLength={6}
                  className="peer w-full bg-transparent border-b-2 border-outline-variant/50 focus:border-primary-container text-body-md text-on-surface pt-6 pb-2 outline-none transition-colors"
                />
                <label htmlFor="signup-password" className="absolute left-0 top-0 text-label-md text-on-surface-variant peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-0 peer-focus:text-label-md peer-focus:text-primary-container transition-all">
                  Contraseña (mínimo 6 caracteres)
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-surface font-semibold text-label-md py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-glow-active transition-all disabled:opacity-60"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </form>
          )}

          {/* Google OAuth */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-outline-variant/30" />
              <span className="text-label-md text-on-surface-variant">o continúa con</span>
              <div className="flex-1 h-px bg-outline-variant/30" />
            </div>
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-outline-variant/50 text-on-surface font-inter text-body-md py-3.5 rounded-xl hover:bg-surface-container transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
