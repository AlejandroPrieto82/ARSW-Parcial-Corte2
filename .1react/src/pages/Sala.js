import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sala() {
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
                    Entrar
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
        if(isOn){
            if(input){
                const a = input.value;
                window.alert("Entrando en "+a);
            }
        }else{
            window.alert("Sala no existente")
        }
        
    }
}