import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span className="text-primary">AI</span>Gen<span className="text-primary">TI</span>
              </span>
            </Link>
            <p className="text-muted-foreground">
              Asistente de IA para estudiantes del Grado de Tecnologías Interactivas de la UPV. Resuelve tus dudas,
              conecta con otros estudiantes y encuentra toda la información que necesitas.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Asistente IA
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/student-chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Chat de Estudiantes
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Enlaces externos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.upv.es/titulaciones/GTI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web oficial GTI
                </a>
              </li>
              <li>
                <a
                  href="https://www.upv.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Universidad Politécnica de Valencia
                </a>
              </li>
              <li>
                <a
                  href="https://intranet.upv.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Intranet UPV
                </a>
              </li>
              <li>
                <a
                  href="https://poliformat.upv.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  PoliFormat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AIGenTI. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              Política de privacidad
            </Button>
            <Button variant="ghost" size="sm">
              Términos de uso
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

