import { useState, useRef } from 'react'
import Pregunta from './Pregunta'

const CATEGORIAS = [
  { nombre: 'Ciencia',     color: '#667eea', emoji: '🔬' },
  { nombre: 'Historia',    color: '#f093fb', emoji: '📜' },
  { nombre: 'Deporte',     color: '#4facfe', emoji: '⚽' },
  { nombre: 'Arte',        color: '#f5576c', emoji: '🎨' },
  { nombre: 'Geografía',   color: '#43e97b', emoji: '🌍' },
  { nombre: 'Tecnología',  color: '#fa709a', emoji: '💻' },
]

export default function Ruleta({ puntaje, setPuntaje, onSalir }) {
  const [girando, setGirando] = useState(false)
  const [rotacion, setRotacion] = useState(0)
  const [categoriaActual, setCategoriaActual] = useState(null)
  const [mostrarPregunta, setMostrarPregunta] = useState(false)
  const [resultado, setResultado] = useState(null)
  const rotacionRef = useRef(0)

  function girarRuleta() {
    if (girando) return
    setGirando(true)
    setResultado(null)
    const giros = 5 + Math.floor(Math.random() * 5)
    const extraGrados = Math.floor(Math.random() * 360)
    const totalGrados = giros * 360 + extraGrados
    const nuevaRotacion = rotacionRef.current + totalGrados
    rotacionRef.current = nuevaRotacion
    setRotacion(nuevaRotacion)

    setTimeout(() => {
      const gradoFinal = nuevaRotacion % 360
      const indiceDesdeCero = Math.floor(gradoFinal / (360 / CATEGORIAS.length))
      const indice = (CATEGORIAS.length - 1 - indiceDesdeCero) % CATEGORIAS.length
      setCategoriaActual(CATEGORIAS[indice])
      setGirando(false)
    }, 4000)
  }

  function handleResponder(correcta) {
    if (correcta) {
      setPuntaje(p => p + 10)
      setResultado('✅ ¡Correcto! +10 puntos')
    } else {
      setResultado('❌ Incorrecto')
    }
    setMostrarPregunta(false)
    setCategoriaActual(null)
  }

  if (mostrarPregunta && categoriaActual) {
    return <Pregunta
      categoria={categoriaActual.nombre}
      onResponder={handleResponder}
      onVolver={() => { setMostrarPregunta(false); setCategoriaActual(null) }}
    />
  }

  const tam = 300
  const cx = tam / 2
  const cy = tam / 2
  const r = tam / 2 - 4
  const n = CATEGORIAS.length
  const angulo = (2 * Math.PI) / n

  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', minHeight:'100vh', padding:'20px'
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', width:'100%', maxWidth:'500px', marginBottom:'20px' }}>
        <h2 style={{ fontSize:'1.5rem' }}>🎯 Preguntados</h2>
        <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
          <span style={{ background:'rgba(255,215,0,0.2)', padding:'6px 14px', borderRadius:'20px', color:'#ffd700', fontWeight:'bold' }}>
            🏆 {puntaje} pts
          </span>
          <button className="btn btn-danger" style={{ padding:'8px 16px', fontSize:'0.9rem' }} onClick={onSalir}>
            Salir
          </button>
        </div>
      </div>

      {resultado && (
        <div style={{
          background: resultado.includes('✅') ? 'rgba(56,161,105,0.2)' : 'rgba(229,62,62,0.2)',
          border: `1px solid ${resultado.includes('✅') ? '#38a169' : '#e53e3e'}`,
          padding:'12px 24px', borderRadius:'12px', marginBottom:'20px',
          fontSize:'1.1rem', fontWeight:'bold'
        }}>{resultado}</div>
      )}

      <div style={{ position:'relative', marginBottom:'20px' }}>
        <div style={{
          position:'absolute', top:'-16px', left:'50%', transform:'translateX(-50%)',
          fontSize:'28px', zIndex:10, filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
        }}>▼</div>

        <svg width={tam} height={tam} style={{
          borderRadius:'50%',
          boxShadow:'0 0 40px rgba(102,126,234,0.4)',
          transform:`rotate(${rotacion}deg)`,
          transition: girando ? 'transform 4s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none'
        }}>
          {CATEGORIAS.map((cat, i) => {
            const startAngle = i * angulo - Math.PI / 2
            const endAngle = startAngle + angulo
            const x1 = cx + r * Math.cos(startAngle)
            const y1 = cy + r * Math.sin(startAngle)
            const x2 = cx + r * Math.cos(endAngle)
            const y2 = cy + r * Math.sin(endAngle)
            const midAngle = startAngle + angulo / 2
            const tx = cx + (r * 0.65) * Math.cos(midAngle)
            const ty = cy + (r * 0.65) * Math.sin(midAngle)
            return (
              <g key={i}>
                <path
                  d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                  fill={cat.color} stroke="white" strokeWidth="2"
                />
                <text
                  x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                  fontSize="22" style={{ userSelect:'none' }}
                >{cat.emoji}</text>
              </g>
            )
          })}
          <circle cx={cx} cy={cy} r="20" fill="white" stroke="#302b63" strokeWidth="3"/>
        </svg>
      </div>

      {categoriaActual && !girando && (
        <div style={{ marginBottom:'20px', textAlign:'center' }}>
          <p style={{ fontSize:'1.2rem', marginBottom:'12px' }}>
            Te tocó: <strong style={{ color: categoriaActual.color }}>
              {categoriaActual.emoji} {categoriaActual.nombre}
            </strong>
          </p>
          <button className="btn btn-success" onClick={() => setMostrarPregunta(true)}>
            ¡Responder pregunta!
          </button>
        </div>
      )}

      <button className="btn btn-primary" onClick={girarRuleta} disabled={girando}
        style={{ fontSize:'1.2rem', padding:'14px 40px', opacity: girando ? 0.7 : 1 }}>
        {girando ? '🌀 Girando...' : '🎰 Girar Ruleta'}
      </button>
    </div>
  )
}
