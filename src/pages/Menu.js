import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
    const nav = useNavigate()

    return (
        <div className='menuDiv'>
            <button
                className="menuButton"
                onClick={() => nav('/game')}
            >
                Jugar solitario
            </button>

            <button
                className="menuButton"
                onClick={() => nav('/crearSala')}
            >
                Crear Sala
            </button>

            <button
                className="menuButton"
                onClick={() => nav('/sala')}
            >
                Unirse a Sala
            </button>

            <button
                className="menuButton"
                onClick={() => {/*window.close()*/ console.log("Salida")}}
            >
                Salir
            </button>

        </div>
    )
}