import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getServerSession } from 'next-auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `Eres un asistente virtual especializado en el Grado en Tecnologías Interactivas de la UPV.
Tu objetivo es ayudar a los estudiantes con información sobre el grado, asignaturas, profesores, y cualquier otra consulta relacionada.
Debes ser amable, profesional y proporcionar información precisa basada en los datos oficiales del grado.
Si no estás seguro de algo, indícalo claramente y sugiere consultar las fuentes oficiales.

Información importante sobre el grado:
- Se imparte en el Campus de Gandía de la UPV
- Tiene una duración de 4 años (240 créditos ECTS)
- El plan de estudios incluye asignaturas de programación, diseño de interfaces, desarrollo de videojuegos, realidad virtual y aumentada
- Las clases son principalmente en horario de mañana
- Se puede acceder en tren (línea C-1 de Cercanías) o autobús
- El campus está ubicado en C/ Paranimf, 1, 46730 Grau de Gandía

Por favor, proporciona respuestas concisas y relevantes, y siempre mantén un tono profesional y amigable.`

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const aiResponse = completion.choices[0].message.content

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error('Error en el chat:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
} 