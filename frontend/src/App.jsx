import { useState } from 'react'
import Inicio from './components/Inicio'
import Ruleta from './components/Ruleta'

function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [puntaje, setPuntaje] = useState(0)

  return (
    <div>
      {pantalla === 'inicio' && (
        <Inicio
          puntaje={puntaje}
          onJugar={() => { setPuntaje(0); setPantalla('juego') }}
        />
      )}
      {pantalla === 'juego' && (
        <Ruleta
          puntaje={puntaje}
          setPuntaje={setPuntaje}
          onSalir={() => setPantalla('inicio')}
        />
      )}
    </div>
  )
}

export default App