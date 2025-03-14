"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Mock AI response function - in a real app, this would call your AI API
const mockAIResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple response logic based on keywords
  if (message.toLowerCase().includes("horario")) {
    return "Los horarios del Grado de Tecnologías Interactivas están disponibles en la web oficial de la UPV. Para el primer curso, las clases suelen ser de 8:30 a 14:30. Puedes consultar el horario específico de tu curso en la sección de horarios de la web del grado."
  } else if (message.toLowerCase().includes("asignatura")) {
    return "El Grado de Tecnologías Interactivas tiene asignaturas como Fundamentos de Programación, Matemáticas, Física, Diseño de Interfaces, Desarrollo Web, Realidad Virtual, entre otras. Cada asignatura tiene entre 4.5 y 6 créditos ECTS."
  } else if (message.toLowerCase().includes("profesor")) {
    return "El Grado de Tecnologías Interactivas cuenta con profesores especializados en diferentes áreas como programación, diseño, matemáticas, física, etc. Puedes consultar el listado completo de profesores y sus horarios de tutoría en la web del grado."
  } else if (message.toLowerCase().includes("campus") || message.toLowerCase().includes("llegar")) {
    return "El Grado de Tecnologías Interactivas se imparte en el campus de Vera de la UPV. Puedes llegar en transporte público (EMT líneas 41, 71, 81, tranvía línea 4), en bicicleta o en coche. La dirección es: Camino de Vera, s/n, 46022 Valencia."
  } else {
    return "Soy el asistente de IA para el Grado de Tecnologías Interactivas. Puedo ayudarte con información sobre horarios, asignaturas, profesores, cómo llegar al campus, y más. ¿En qué puedo ayudarte?"
  }
}

export default function AIChat({ isPreview = false }: { isPreview?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, soy el asistente de IA para el Grado de Tecnologías Interactivas. ¿En qué puedo ayudarte?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get AI response
      const response = await mockAIResponse(input)

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("flex flex-col", isPreview ? "h-[400px]" : "h-[calc(100vh-12rem)]")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Asistente IA GTI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "user" ? "ml-auto bg-primary/10" : "bg-muted",
              )}
            >
              <Avatar className="h-8 w-8">
                {message.role === "user" ? (
                  <>
                    <AvatarFallback>U</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  </>
                ) : (
                  <>
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  </>
                )}
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{message.role === "user" ? "Tú" : "Asistente IA"}</p>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isPreview}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isPreview}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

