"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data for student chat
type ChatMessage = {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    course: number
  }
  timestamp: Date
}

type ChatRoom = {
  id: string
  name: string
  description: string
  participants: number
  messages: ChatMessage[]
}

const mockChatRooms: ChatRoom[] = [
  {
    id: "general",
    name: "General",
    description: "Chat general para todos los estudiantes del grado",
    participants: 124,
    messages: [
      {
        id: "1",
        content: "Hola a todos, ¿alguien sabe cuándo empiezan las clases del segundo semestre?",
        sender: {
          id: "user1",
          name: "Ana García",
          course: 2,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "2",
        content: "Según el calendario académico, empiezan el 29 de enero",
        sender: {
          id: "user2",
          name: "Carlos Martínez",
          course: 3,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
      },
      {
        id: "3",
        content: "¡Gracias! ¿Alguien tiene el horario del grupo B?",
        sender: {
          id: "user1",
          name: "Ana García",
          course: 2,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
    ],
  },
  {
    id: "primero",
    name: "Primer Curso",
    description: "Chat para estudiantes de primer curso",
    participants: 45,
    messages: [
      {
        id: "1",
        content: "¿Alguien tiene los apuntes de Fundamentos de Programación?",
        sender: {
          id: "user3",
          name: "Laura Sánchez",
          course: 1,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: "2",
        content: "Yo los tengo, te los puedo pasar mañana en clase",
        sender: {
          id: "user4",
          name: "David López",
          course: 1,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
      },
    ],
  },
  {
    id: "segundo",
    name: "Segundo Curso",
    description: "Chat para estudiantes de segundo curso",
    participants: 38,
    messages: [
      {
        id: "1",
        content: "¿Alguien sabe si hay que entregar el proyecto de Diseño de Interfaces antes del viernes?",
        sender: {
          id: "user5",
          name: "Elena Ruiz",
          course: 2,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      },
      {
        id: "2",
        content: "Sí, la fecha límite es el viernes a las 23:59",
        sender: {
          id: "user6",
          name: "Pablo Fernández",
          course: 2,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
      },
    ],
  },
  {
    id: "tercero",
    name: "Tercer Curso",
    description: "Chat para estudiantes de tercer curso",
    participants: 32,
    messages: [
      {
        id: "1",
        content: "¿Alguien ha empezado ya el trabajo de Realidad Virtual?",
        sender: {
          id: "user7",
          name: "Miguel Torres",
          course: 3,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
      {
        id: "2",
        content: "Yo estoy empezando ahora, ¿quieres que formemos un grupo?",
        sender: {
          id: "user8",
          name: "Sara Navarro",
          course: 3,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5), // 4.5 hours ago
      },
    ],
  },
  {
    id: "cuarto",
    name: "Cuarto Curso",
    description: "Chat para estudiantes de cuarto curso",
    participants: 28,
    messages: [
      {
        id: "1",
        content: "¿Alguien sabe cuándo es la próxima sesión de presentación de TFGs?",
        sender: {
          id: "user9",
          name: "Javier Gómez",
          course: 4,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      },
      {
        id: "2",
        content: "Según el calendario, la próxima sesión es el 15 de febrero",
        sender: {
          id: "user10",
          name: "Lucía Díaz",
          course: 4,
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5.5), // 5.5 hours ago
      },
    ],
  },
]

export default function StudentChatPage() {
  const [activeRoom, setActiveRoom] = useState<string>("general")
  const [input, setInput] = useState("")
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeRoom, chatRooms])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Create new message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: {
        id: "currentUser", // In a real app, this would be the current user's ID
        name: "Tú", // In a real app, this would be the current user's name
        course: 2, // In a real app, this would be the current user's course
      },
      timestamp: new Date(),
    }

    // Add message to the active room
    setChatRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === activeRoom ? { ...room, messages: [...room.messages, newMessage] } : room)),
    )

    // Clear input
    setInput("")
  }

  const currentRoom = chatRooms.find((room) => room.id === activeRoom)

  return (
    <div className="container py-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Chat de Estudiantes</h1>
        <p className="text-muted-foreground">
          Conecta con otros estudiantes del Grado de Tecnologías Interactivas, comparte experiencias y resuelve dudas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Salas de Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {chatRooms.map((room) => (
                  <Button
                    key={room.id}
                    variant={activeRoom === room.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveRoom(room.id)}
                  >
                    <div className="flex flex-col items-start">
                      <span>{room.name}</span>
                      <span className="text-xs text-muted-foreground">{room.participants} participantes</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[calc(100vh-16rem)]">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span>{currentRoom?.name}</span>
                  <p className="text-sm font-normal text-muted-foreground mt-1">{currentRoom?.description}</p>
                </div>
                <Badge variant="outline">{currentRoom?.participants} participantes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {currentRoom?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex items-start gap-3", message.sender.id === "currentUser" && "flex-row-reverse")}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                      {message.sender.avatar && <AvatarImage src={message.sender.avatar} />}
                    </Avatar>
                    <div
                      className={cn(
                        "rounded-lg p-3 max-w-[80%]",
                        message.sender.id === "currentUser" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium">{message.sender.name}</p>
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                          {message.sender.course}º curso
                        </Badge>
                        <span className="text-xs opacity-70">
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
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar mensaje</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

