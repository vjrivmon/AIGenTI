'use client'

import React, { useState } from 'react'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: '¿Qué es el Grado en Tecnologías Interactivas?',
        a: 'El Grado en Tecnologías Interactivas es una titulación oficial de la UPV que forma profesionales especializados en el desarrollo de tecnologías interactivas, videojuegos y experiencias digitales.'
      },
      {
        q: '¿Cuánto dura la carrera?',
        a: 'La carrera tiene una duración de 4 años (8 semestres) y un total de 240 créditos ECTS.'
      }
    ]
  },
  {
    category: 'Ubicación y Acceso',
    questions: [
      {
        q: '¿Dónde se imparte la carrera?',
        a: 'La carrera se imparte en la Escuela Politécnica Superior de Gandía (EPSG), situada en el Campus de Gandía de la UPV.'
      },
      {
        q: '¿Cómo llegar al campus?',
        a: 'El campus está ubicado en la C/ Paranimf, 1, 46730 Grau de Gandía. Se puede llegar en tren (línea C-1 de Cercanías), autobús o coche.'
      }
    ]
  },
  {
    category: 'Asignaturas y Horarios',
    questions: [
      {
        q: '¿Qué asignaturas se imparten?',
        a: 'El plan de estudios incluye asignaturas de programación, diseño de interfaces, desarrollo de videojuegos, realidad virtual, animación digital y más. Puedes consultar el plan completo en la web oficial.'
      },
      {
        q: '¿Cuál es el horario de clases?',
        a: 'Las clases se imparten principalmente en horario de mañana, aunque algunas asignaturas pueden tener sesiones por la tarde. Los horarios específicos se publican antes del inicio de cada semestre.'
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>(faqs[0].category)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = searchTerm
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          q =>
            q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter(category => category.questions.length > 0)
    : faqs

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Preguntas Frecuentes
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              {filteredFaqs.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeCategory === category.category
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {filteredFaqs
              .find((c) => c.category === activeCategory)
              ?.questions.map((faq, index) => (
                <div
                  key={index}
                  className={`${index > 0 ? 'border-t pt-6 mt-6' : ''}`}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 