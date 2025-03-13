'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function ChatButton() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const { status } = useSession()

  const handleClick = () => {
    if (status === 'authenticated') {
      router.push('/chat')
    } else {
      router.push('/login')
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
    >
      <div className="relative w-8 h-8">
        <Image
          src="/bot-avatar.png"
          alt="AIGenTI Bot"
          fill
          className="rounded-full"
        />
      </div>
      {isHovered && (
        <span className="whitespace-nowrap">
          {status === 'authenticated' ? '¿Necesitas ayuda?' : 'Inicia sesión para chatear'}
        </span>
      )}
    </button>
  )
} 