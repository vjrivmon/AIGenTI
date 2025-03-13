import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    // Encriptar la contraseña
    const hashedPassword = await hash(password, 12)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      }
    })

    // Eliminar la contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json(userWithoutPassword)
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    return res.status(500).json({ error: 'Error al registrar usuario' })
  }
} 