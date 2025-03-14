import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, MessageCircle, Users } from "lucide-react"
import AIChat from "@/components/ai-chat"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Bienvenido a AIGenTI
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Tu asistente para el Grado de Tecnologías Interactivas
              </h1>
              <p className="text-lg text-muted-foreground">
                Resuelve tus dudas, conecta con otros estudiantes y encuentra toda la información que necesitas sobre el
                Grado de Tecnologías Interactivas de la UPV.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/register">
                    Regístrate <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/faqs">Preguntas frecuentes</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md aspect-square bg-primary/5 rounded-full flex items-center justify-center">
                <div className="w-4/5 h-4/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                    <span className="text-4xl md:text-6xl font-bold text-primary-foreground">AI</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-background rounded-full p-2 border-4 border-background">
                    <span className="text-xl md:text-2xl font-bold text-primary">GTI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">¿Cómo te podemos ayudar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Asistente IA</h3>
              <p className="text-muted-foreground mb-4">
                Resuelve tus dudas sobre el grado, asignaturas, profesores y más con nuestro asistente de IA.
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link href="/chat">Hablar con el asistente</Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Preguntas Frecuentes</h3>
              <p className="text-muted-foreground mb-4">
                Encuentra respuestas a las preguntas más comunes sobre horarios, campus, asignaturas y créditos.
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link href="/faqs">Ver FAQs</Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chat de Estudiantes</h3>
              <p className="text-muted-foreground mb-4">
                Conecta con otros estudiantes, comparte experiencias y ayuda a resolver dudas.
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link href="/student-chat">Ir al chat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Chat Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">¿Tienes una pregunta rápida?</h2>
              <p className="text-muted-foreground mb-6">
                Prueba nuestro asistente IA para resolver tus dudas sobre el Grado de Tecnologías Interactivas. Para
                acceder a todas las funcionalidades, regístrate en nuestra plataforma.
              </p>
              <Button asChild>
                <Link href="/register">Crear cuenta</Link>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-card rounded-lg shadow-sm border p-4">
                <AIChat isPreview={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

