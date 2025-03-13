'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'
import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
      >
        {children}
      </motion.main>
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      {/* Notification Badge */}
      {session && (
        <div className="fixed bottom-20 right-4 p-3 rounded-full bg-red-500 text-white shadow-lg animate-bounce">
          🔔
        </div>
      )}
    </div>
  )
} 