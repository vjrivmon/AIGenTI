import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { name, course, passedSubjects } = data

    if (!name || !course || passedSubjects === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: {
        email: session.user?.email as string,
      },
      data: {
        name,
        course: parseInt(course),
        passedSubjects: parseInt(passedSubjects),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el perfil' },
      { status: 500 }
    )
  }
} 