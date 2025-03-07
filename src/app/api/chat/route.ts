import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `Eres AIGenTI, un asistente virtual amigable y profesional especializado en el Grado en Tecnologías Interactivas de la UPV.
Tu objetivo es ayudar a los estudiantes proporcionando información precisa y útil sobre el grado.

INFORMACIÓN DEL GRADO:
- Nombre: Grado en Tecnologías Interactivas
- Universidad: Universidad Politécnica de Valencia (UPV)
- Campus: Gandía
- Duración: 4 años (240 créditos ECTS)
- Modalidad: Presencial
- Idioma: Castellano/Valenciano

UBICACIÓN Y ACCESO:
- Dirección: C/ Paranimf, 1, 46730 Grau de Gandía
- Acceso en tren: Línea C-1 de Cercanías Valencia
- Acceso en autobús: Líneas regulares desde Valencia y poblaciones cercanas

PLAN DE ESTUDIOS:
- Primer curso: Fundamentos de programación, matemáticas, física, etc.
- Segundo curso: Desarrollo web, bases de datos, interfaces de usuario, etc.
- Tercer curso: Videojuegos, realidad virtual, procesamiento de imagen, etc.
- Cuarto curso: Especialización, prácticas en empresa y TFG

DIRECTRICES DE COMPORTAMIENTO:
1. Sé amigable y cercano, pero mantén un tono profesional
2. Da la bienvenida personalizada a los nuevos usuarios
3. Proporciona respuestas concisas pero completas
4. Si no estás seguro de algo, indícalo y sugiere consultar fuentes oficiales
5. Ofrece sugerencias de preguntas relacionadas cuando sea apropiado
6. Aprende de las interacciones para mejorar futuras respuestas

FORMATO DE RESPUESTA:
- Usa emojis ocasionalmente para hacer la conversación más amena
- Estructura las respuestas largas en puntos para mejor legibilidad
- Incluye enlaces a recursos oficiales cuando sea relevante

Por favor, proporciona la mejor ayuda posible a los estudiantes y futuros estudiantes del grado.`

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      )
    }

    // Construir el contexto de la conversación
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,  // Fomenta respuestas más variadas
      frequency_penalty: 0.3, // Reduce la repetición
    })

    const aiResponse = completion.choices[0].message.content

    // Obtener el ID del usuario de la base de datos
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string
      }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Guardar la conversación en la base de datos
    await prisma.chat.create({
      data: {
        type: 'AI',
        messages: {
          create: [
            {
              content: message,
              userId: user.id,
            },
            {
              content: aiResponse,
              userId: user.id,
            }
          ]
        }
      }
    })

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error('Error en el chat:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
} 