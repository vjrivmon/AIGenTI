import AIChat from "@/components/ai-chat"

export default function ChatPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Asistente IA para GTI</h1>
        <p className="text-muted-foreground">
          Pregúntame cualquier cosa sobre el Grado de Tecnologías Interactivas. Puedo ayudarte con información sobre
          horarios, asignaturas, profesores, cómo llegar al campus, y más.
        </p>
      </div>
      <AIChat />
    </div>
  )
}

