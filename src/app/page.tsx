import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Bienvenido a AIGenTI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu asistente virtual para el Grado en Tecnologías Interactivas de la UPV
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/chat"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chatear con AIGenTI
            </Link>
            <Link
              href="/faq"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Preguntas frecuentes
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Chat con IA</h2>
            <p className="text-gray-600">
              Resuelve tus dudas sobre el grado con nuestro asistente virtual disponible 24/7
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Comunidad GTI</h2>
            <p className="text-gray-600">
              Conecta con otros estudiantes y comparte experiencias en nuestro chat comunitario
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Información Académica</h2>
            <p className="text-gray-600">
              Accede a horarios, profesores y toda la información sobre las asignaturas
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 