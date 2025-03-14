import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for FAQs
const faqCategories = [
  {
    id: "general",
    name: "Información General",
    faqs: [
      {
        question: "¿Qué es el Grado de Tecnologías Interactivas?",
        answer:
          "El Grado de Tecnologías Interactivas es una titulación oficial de la Universidad Politécnica de Valencia que forma a profesionales en el ámbito de las tecnologías interactivas, combinando conocimientos de programación, diseño, realidad virtual, videojuegos y experiencias interactivas.",
      },
      {
        question: "¿Cuántos créditos tiene el grado?",
        answer:
          "El Grado de Tecnologías Interactivas tiene un total de 240 créditos ECTS, distribuidos en 4 cursos académicos de 60 créditos cada uno.",
      },
      {
        question: "¿Cuáles son las salidas profesionales?",
        answer:
          "Las principales salidas profesionales incluyen: desarrollador de videojuegos, diseñador de experiencias interactivas, programador de aplicaciones de realidad virtual y aumentada, diseñador UX/UI, desarrollador frontend, especialista en tecnologías inmersivas, entre otras.",
      },
    ],
  },
  {
    id: "campus",
    name: "Campus y Ubicación",
    faqs: [
      {
        question: "¿Dónde se imparte el grado?",
        answer:
          "El Grado de Tecnologías Interactivas se imparte en el campus de Vera de la Universidad Politécnica de Valencia, situado en Camino de Vera, s/n, 46022 Valencia.",
      },
      {
        question: "¿Cómo puedo llegar al campus?",
        answer:
          "Puedes llegar al campus de Vera en transporte público (EMT líneas 41, 71, 81, tranvía línea 4), en bicicleta o en coche. El campus cuenta con aparcamientos para estudiantes.",
      },
      {
        question: "¿Qué instalaciones tiene el campus?",
        answer:
          "El campus de Vera cuenta con bibliotecas, cafeterías, instalaciones deportivas, laboratorios especializados, aulas de informática, espacios de coworking, y todos los servicios necesarios para los estudiantes.",
      },
    ],
  },
  {
    id: "asignaturas",
    name: "Asignaturas y Horarios",
    faqs: [
      {
        question: "¿Cuáles son las asignaturas principales?",
        answer:
          "Algunas de las asignaturas principales incluyen: Fundamentos de Programación, Matemáticas, Física, Diseño de Interfaces, Desarrollo Web, Realidad Virtual, Diseño de Videojuegos, Programación Gráfica, Animación 3D, entre otras.",
      },
      {
        question: "¿Cuál es el horario de clases?",
        answer:
          "Los horarios varían según el curso y el semestre. Generalmente, las clases se imparten de lunes a viernes en horario de mañana (8:30-14:30) para los primeros cursos. Puedes consultar los horarios específicos en la web del grado.",
      },
      {
        question: "¿Cuántos créditos tiene cada asignatura?",
        answer:
          "La mayoría de las asignaturas tienen 6 créditos ECTS, aunque algunas asignaturas optativas pueden tener 4.5 créditos. El Trabajo Fin de Grado tiene 12 créditos ECTS.",
      },
    ],
  },
  {
    id: "profesores",
    name: "Profesorado",
    faqs: [
      {
        question: "¿Quiénes son los profesores del grado?",
        answer:
          "El grado cuenta con profesores especializados en diferentes áreas como programación, diseño, matemáticas, física, etc. Puedes consultar el listado completo de profesores en la web del grado.",
      },
      {
        question: "¿Cómo puedo contactar con un profesor?",
        answer:
          "Puedes contactar con los profesores a través del correo electrónico institucional o durante sus horarios de tutorías. Esta información está disponible en la guía docente de cada asignatura.",
      },
      {
        question: "¿Cuáles son los horarios de tutorías?",
        answer:
          "Los horarios de tutorías varían según el profesor y el semestre. Generalmente, cada profesor tiene 6 horas semanales de tutorías. Puedes consultar los horarios específicos en la web del grado o en la guía docente de cada asignatura.",
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-4 mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Preguntas Frecuentes</h1>
        <p className="text-muted-foreground text-center">
          Encuentra respuestas a las preguntas más comunes sobre el Grado de Tecnologías Interactivas.
        </p>
      </div>

      <Tabs defaultValue="general" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {faqCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {faqCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Preguntas frecuentes sobre {category.name.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

