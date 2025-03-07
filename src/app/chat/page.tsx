'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "¿Qué asignaturas hay en primer curso?",
  "¿Cómo llego al campus de Gandía?",
  "¿Qué salidas profesionales tiene el grado?",
  "¿Cuántos créditos tiene cada asignatura?",
  "¿Cuál es el horario de clases?",
  "¿Cómo funcionan las prácticas en empresa?",
]

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && messages.length === 0) {
      // Mensaje de bienvenida
      setMessages([{
        role: 'assistant',
        content: `¡Hola ${session?.user?.name || 'estudiante'}! 👋 Soy AIGenTI, tu asistente virtual para el Grado en Tecnologías Interactivas. ¿En qué puedo ayudarte hoy?`
      }])
    }
  }, [status, router, session, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent, suggestedMessage?: string) => {
    e.preventDefault()
    const userMessage = suggestedMessage || input.trim()
    if (!userMessage || loading) return

    setInput('')
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error('Error en la respuesta del servidor')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
        },
      ])
    } finally {
      setLoading(false)
      setIsTyping(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Panel lateral izquierdo */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4 hidden md:block">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">AIGenTI</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative w-12 h-12">
              <Image
                src="/bot-avatar.png"
                alt="AIGenTI Bot"
                fill
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Asistente Virtual GTI</p>
              <p className="text-xs text-green-500">En línea</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Preguntas sugeridas</h3>
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={(e) => handleSubmit(e, question)}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat principal */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 relative mr-2">
                  <Image
                    src="/bot-avatar.png"
                    alt="AIGenTI Bot"
                    fill
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/bot-avatar.png"
                  alt="AIGenTI Bot"
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 