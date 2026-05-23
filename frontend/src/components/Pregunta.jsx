import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Pregunta({ categoria, onResponder, onVolver }) {
  const [pregunta, setPregunta] = useState(null)
  const [seleccionada, setSeleccionada] = useState(null)
  const [respondida, setRespondida] = useState(false)
  const [tiempo, setTiempo] = useState(15)

  useEffect(() => {
    axios.get(`https://preguntados-production.up.railway.app/api/pregunta/${categoria}`)
      .then(r => setPregunta(r.data))
      .catch(() => setPregunta(null))
  }, [categoria])

  useEffect(() => {
    if (!pregunta || respondida) return
    if (tiempo === 0) { handleRespuesta(null); return }
    const t = setTimeout(() => setTiempo(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [tiempo, pregunta, respondida])

  function handleRespuesta(idx) {
    if (respondida) return
    setSeleccionada(idx)
    setRespondida(true)
    const correcta = idx === pregunta.correcta
    setTimeout(() => onResponder(correcta), 1500)
  }

  function colorBoton(idx) {
    if (!respondida) return 'rgba(255,255,255,0.1)'
    if (idx === pregunta.correcta) return '#38a169'
    if (idx === seleccionada) return '#e53e3e'
    return 'rgba(255,255,255,0.05)'
  }

  if (!pregunta) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh' }}>
      <p style={{ fontSize:'1.5rem' }}>Cargando pregunta...</p>
    </div>
  )

  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', minHeight:'100vh', padding:'20px'
    }}>
      <div style={{
        background:'rgba(255,255,255,0.05)', borderRadius:'24px',
        padding:'40px', maxWidth:'600px', width:'100%', backdropFilter:'blur(10px)'
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
          <span style={{
            background:'linear-gradient(135deg,#667eea,#764ba2)',
            padding:'6px 16px', borderRadius:'20px', fontWeight:'bold'
          }}>{categoria}</span>
          <span style={{
            background: tiempo <= 5 ? '#e53e3e' : 'rgba(255,255,255,0.1)',
            padding:'6px 16px', borderRadius:'20px', fontWeight:'bold',
            transition:'background 0.3s'
          }}>⏱ {tiempo}s</span>
        </div>

        <h2 style={{ fontSize:'1.4rem', marginBottom:'30px', lineHeight:'1.5' }}>
          {pregunta.pregunta}
        </h2>

        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {pregunta.opciones.map((op, idx) => (
            <button key={idx} onClick={() => handleRespuesta(idx)}
              style={{
                background: colorBoton(idx),
                border: '1px solid rgba(255,255,255,0.15)',
                color:'white', padding:'14px 20px', borderRadius:'12px',
                fontSize:'1rem', cursor: respondida ? 'default' : 'pointer',
                textAlign:'left', transition:'background 0.3s'
              }}>
              <span style={{ fontWeight:'bold', marginRight:'10px' }}>
                {['A','B','C','D'][idx]})
              </span>
              {op}
            </button>
          ))}
        </div>

        <button className="btn btn-danger" onClick={onVolver}
          style={{ marginTop:'24px', width:'100%' }}>
          ← Volver a la ruleta
        </button>
      </div>
    </div>
  )
}