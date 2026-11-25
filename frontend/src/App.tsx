import { useEffect, useState } from 'react'

type Estado = 'cargando' | 'UP' | 'DOWN' | 'sin conexión'

export default function App() {
  const [estado, setEstado] = useState<Estado>('cargando')

  useEffect(() => {
    fetch('/actuator/health')
      .then((res) => res.json())
      .then((data: { status: string }) => setEstado(data.status === 'UP' ? 'UP' : 'DOWN'))
      .catch(() => setEstado('sin conexión'))
  }, [])

  const color =
    estado === 'UP' ? 'bg-emerald-500' : estado === 'cargando' ? 'bg-slate-400' : 'bg-red-500'

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-2xl font-semibold">Vigía</h1>
        <p className="mt-1 text-slate-400">SOC asistido por IA</p>
        <div className="mt-6 flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${color}`} />
          <span>Backend: {estado}</span>
        </div>
      </div>
    </main>
  )
}