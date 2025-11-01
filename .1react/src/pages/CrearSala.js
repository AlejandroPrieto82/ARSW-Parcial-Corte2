import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CrearSala() {
    const [isOn, setOn] = useState(false);
    const nav = useNavigate()

    return (
        <div className="salaDiv">
            <div>
                <input
                    type='number'
                    id='salaInputId'
                >
                </input>
                <button
                    className="menuButton"
                    onClick={() => buscar()}
                >
                    Buscar
                </button>
                <button
                    className="menuButton"
                    onClick={() => entrar()}
                >
                    Crear
                </button>

            </div>

            <button
                className="menuButton"
                onClick={() => nav('/menu')}
            >
                Menu
            </button>
        </div>

    )

    function buscar() {
        const input = document.getElementById("salaInputId");
        if(input){
            const a = input.value;
            window.alert("Buscando: "+a);
        }
    }

    function entrar() {
        const input = document.getElementById("salaInputId");
        buscar()
        if(!isOn){
            if(input){
                const a = input.value;
                window.alert("Creando: "+a);
            }
        }else{
            window.alert("Escoja otro codigo, codigo ya en uso")
        }
        
    }
}