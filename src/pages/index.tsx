'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '@/components/Layout'

export default function Home() {
  const { theme } = useTheme()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  const features = [
    {
      title: 'Chat Inteligente',
      description: 'Resuelve tus dudas académicas con nuestro asistente AI personalizado.',
      icon: '🤖',
    },
    {
      title: 'Horarios Interactivos',
      description: 'Gestiona tu tiempo con nuestro sistema de horarios intuitivo.',
      icon: '📅',
    },
    {
      title: 'FAQ Dinámica',
      description: 'Encuentra respuestas rápidas a las preguntas más comunes.',
      icon: '❓',
    },
    {
      title: 'Perfil Personalizado',
      description: 'Adapta la experiencia a tus necesidades específicas.',
      icon: '👤',
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Bienvenido a AIGenTI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Tu asistente inteligente para la UPV
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-4">Chat Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Resuelve tus dudas con nuestro asistente virtual disponible 24/7.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-4">Horarios y Calendario</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Consulta los horarios de clases y eventos académicos importantes.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-4">FAQ</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Encuentra respuestas a las preguntas más frecuentes sobre la universidad.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 