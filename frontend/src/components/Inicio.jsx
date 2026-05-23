export default function Inicio({ onJugar, puntaje }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '20px'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎯</div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px',
        background: 'linear-gradient(135deg, #667eea, #f093fb)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        Preguntados
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#a0aec0', marginBottom: '10px' }}>
        Gira la ruleta, elige una categoría y responde
      </p>
      {puntaje > 0 && (
        <p style={{ fontSize: '1rem', color: '#ffd700', marginBottom: '20px' }}>
          🏆 Último puntaje: {puntaje} puntos
        </p>
      )}
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={onJugar} style={{ fontSize: '1.3rem', padding: '16px 48px' }}>
          🎮 Iniciar Juego
        </button>
      </div>
      <div style={{ marginTop: '50px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['🔬 Ciencia','📜 Historia','⚽ Deporte','🎨 Arte','🌍 Geografía','💻 Tecnología'].map(c => (
          <span key={c} style={{
            background: 'rgba(255,255,255,0.1)', padding: '8px 16px',
            borderRadius: '20px', fontSize: '0.9rem'
          }}>{c}</span>
        ))}
      </div>
    </div>
  )
}