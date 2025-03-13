import React, { useState } from 'react'
import { Calendar } from '../components/Calendar'
import Layout from '@/components/Layout'

const CURSOS = [
  {
    id: 1,
    nombre: "Primer curso",
    horario: [
      {
        dia: "Lunes",
        clases: [
          { hora: "09:00-11:00", asignatura: "Fundamentos de Programación", profesor: "Dr. García", aula: "A-101" },
          { hora: "11:30-13:30", asignatura: "Matemáticas I", profesor: "Dra. Martínez", aula: "A-102" }
        ]
      },
      {
        dia: "Martes",
        clases: [
          { hora: "14:00-16:00", asignatura: "Base de Datos", profesor: "Dr. López", aula: "A-103" },
          { hora: "16:30-18:30", asignatura: "Programación Web", profesor: "Dra. Torres", aula: "A-104" }
        ]
      },
      { 
        dia: "Miércoles",
        clases: [
          { hora: "09:00-11:00", asignatura: "Sistemas Operativos", profesor: "Dr. García", aula: "A-105" },
          { hora: "11:30-13:30", asignatura: "Redes de Computadoras", profesor: "Dra. Martínez", aula: "A-106" }
        ]
      },
      {
        dia: "Jueves",
        clases: [
          { hora: "14:00-16:00", asignatura: "Sistemas Operativos", profesor: "Dr. García", aula: "A-107" },
          { hora: "16:30-18:30", asignatura: "Redes de Computadoras", profesor: "Dra. Martínez", aula: "A-108" }
        ]
      },
      {
        dia: "Viernes",
        clases: [
          { hora: "14:00-16:00", asignatura: "Sistemas Operativos", profesor: "Dr. García", aula: "A-109" },
          { hora: "16:30-18:30", asignatura: "Redes de Computadoras", profesor: "Dra. Martínez", aula: "A-110" }
        ]
      }
    ]
  }
]

export default function HorariosPage() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(1)
  const [vista, setVista] = useState<'horario' | 'calendario'>('horario')

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Horarios y Calendario Académico</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Consulta los horarios de clase y el calendario académico del Grado en Tecnologías Interactivas
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setVista('horario')}
                className={`${
                  vista === 'horario'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Horario Semanal
              </button>
              <button
                onClick={() => setVista('calendario')}
                className={`${
                  vista === 'calendario'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                Calendario Académico
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="curso" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Selecciona el curso
              </label>
              <select
                id="curso"
                value={cursoSeleccionado}
                onChange={(e) => setCursoSeleccionado(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {CURSOS.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </div>

            {vista === 'horario' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Lunes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Martes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Miércoles
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Jueves
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Viernes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {CURSOS[0].horario[0].clases.map((clase, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {clase.hora}
                        </td>
                        {CURSOS[0].horario.map((dia, diaIndex) => (
                          <td key={diaIndex} className="px-6 py-4">
                            {dia.clases[index] && (
                              <>
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {dia.clases[index].asignatura}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {dia.clases[index].profesor} - {dia.clases[index].aula}
                                </div>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-[600px]">
                <Calendar />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
} 