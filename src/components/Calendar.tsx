/* The code provided is a TypeScript React component that represents a calendar. Here is a breakdown of
what the code does: */
'use client'

import React, { useState } from 'react'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const EVENTOS_ACADEMICOS = {
  '2024-09-11': { titulo: 'Inicio de curso', tipo: 'inicio' },
  '2024-12-23': { titulo: 'Vacaciones de Navidad', tipo: 'vacaciones' },
  '2025-01-07': { titulo: 'Fin vacaciones de Navidad', tipo: 'fin-vacaciones' },
  '2025-01-20': { titulo: 'Inicio exámenes', tipo: 'examenes' },
  '2025-06-15': { titulo: 'Fin de curso', tipo: 'fin' },
}

export function Calendar() {
  const [fecha, setFecha] = useState(new Date())
  const [año, mes] = [fecha.getFullYear(), fecha.getMonth()]

  const primerDiaMes = new Date(año, mes, 1)
  const ultimoDiaMes = new Date(año, mes + 1, 0)
  const diasEnMes = ultimoDiaMes.getDate()
  const primerDiaSemana = primerDiaMes.getDay()

  const diasCalendario = []
  for (let i = 0; i < primerDiaSemana; i++) {
    diasCalendario.push(null)
  }
  for (let dia = 1; dia <= diasEnMes; dia++) {
    diasCalendario.push(dia)
  }

  const cambiarMes = (incremento: number) => {
    setFecha(new Date(año, mes + incremento, 1))
  }

  const obtenerEvento = (dia: number) => {
    const fecha = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
    return EVENTOS_ACADEMICOS[fecha]
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => cambiarMes(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {MESES[mes]} {año}
        </h2>
        <button
          onClick={() => cambiarMes(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 border-b">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia) => (
          <div
            key={dia}
            className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-700"
          >
            {dia}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {diasCalendario.map((dia, index) => {
          const evento = dia ? obtenerEvento(dia) : null
          return (
            <div
              key={index}
              className={`bg-white p-2 h-24 ${
                !dia ? 'text-gray-400' : ''
              }`}
            >
              <div className="font-medium text-sm">{dia}</div>
              {evento && (
                <div
                  className={`mt-1 text-xs p-1 rounded ${
                    evento.tipo === 'inicio'
                      ? 'bg-green-100 text-green-800'
                      : evento.tipo === 'fin'
                      ? 'bg-red-100 text-red-800'
                      : evento.tipo === 'examenes'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {evento.titulo}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 