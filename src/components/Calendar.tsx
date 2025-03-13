/* The code provided is a TypeScript React component that represents a calendar. Here is a breakdown of
what the code does: */
'use client'

import React, { useState } from 'react'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const EVENTOS_ACADEMICOS = [
  { fecha: '2024-02-15', titulo: 'Inicio del semestre', tipo: 'general' },
  { fecha: '2024-03-15', titulo: 'Exámenes parciales', tipo: 'examen' },
  { fecha: '2024-04-01', titulo: 'Vacaciones de Pascua', tipo: 'festivo' },
  { fecha: '2024-05-20', titulo: 'Entrega de proyectos', tipo: 'proyecto' },
  { fecha: '2024-06-15', titulo: 'Exámenes finales', tipo: 'examen' },
  { fecha: '2024-07-01', titulo: 'Inicio de vacaciones', tipo: 'festivo' },
]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1))
  }

  const getEventosDelDia = (dia: number) => {
    const fecha = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
    return EVENTOS_ACADEMICOS.filter(evento => evento.fecha === fecha)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const blanks = Array(firstDayOfMonth).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {MESES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ←
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} className="aspect-square" />
        ))}
        
        {days.map(day => {
          const eventos = getEventosDelDia(day)
          return (
            <div
              key={day}
              className={`aspect-square p-1 rounded-lg border border-gray-200 dark:border-gray-700
                ${eventos.length > 0 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {day}
              </div>
              {eventos.map((evento, index) => (
                <div
                  key={index}
                  className="text-xs mt-1 truncate"
                  style={{
                    color: evento.tipo === 'examen' ? '#ef4444' :
                           evento.tipo === 'proyecto' ? '#3b82f6' :
                           evento.tipo === 'festivo' ? '#10b981' : '#6b7280'
                  }}
                >
                  {evento.titulo}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
} 