"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

// Mock data for subjects
const mockSubjects = [
  { id: "1", name: "Fundamentos de Programación", credits: 6, year: 1, semester: 1 },
  { id: "2", name: "Matemáticas I", credits: 6, year: 1, semester: 1 },
  { id: "3", name: "Física", credits: 6, year: 1, semester: 1 },
  { id: "4", name: "Introducción a los Computadores", credits: 6, year: 1, semester: 1 },
  { id: "5", name: "Expresión Gráfica", credits: 6, year: 1, semester: 1 },
  { id: "6", name: "Programación", credits: 6, year: 1, semester: 2 },
  { id: "7", name: "Matemáticas II", credits: 6, year: 1, semester: 2 },
  { id: "8", name: "Empresa", credits: 6, year: 1, semester: 2 },
  { id: "9", name: "Diseño de Interfaces", credits: 6, year: 1, semester: 2 },
  { id: "10", name: "Estructura de Computadores", credits: 6, year: 1, semester: 2 },
  { id: "11", name: "Programación Web", credits: 6, year: 2, semester: 1 },
  { id: "12", name: "Bases de Datos", credits: 6, year: 2, semester: 1 },
  { id: "13", name: "Sistemas Operativos", credits: 6, year: 2, semester: 1 },
  { id: "14", name: "Redes de Computadores", credits: 6, year: 2, semester: 1 },
  { id: "15", name: "Diseño de Videojuegos", credits: 6, year: 2, semester: 1 },
]

export default function ProfilePage() {
  const [name, setName] = useState("Usuario de Ejemplo")
  const [email, setEmail] = useState("usuario@ejemplo.com")
  const [course, setCourse] = useState("2")
  const [completedSubjects, setCompletedSubjects] = useState<string[]>(["1", "2", "3", "4", "5"])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al actualizar tu perfil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubjectToggle = (subjectId: string) => {
    setCompletedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }

  // Calculate progress
  const totalCredits = mockSubjects.reduce((acc, subject) => acc + subject.credits, 0)
  const completedCredits = mockSubjects
    .filter((subject) => completedSubjects.includes(subject.id))
    .reduce((acc, subject) => acc + subject.credits, 0)
  const progressPercentage = Math.round((completedCredits / totalCredits) * 100)

  return (
    <div className="container py-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y seguimiento académico</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="academic">Progreso Académico</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Tu foto de perfil y datos básicos</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-medium">{name}</h3>
                  <p className="text-muted-foreground">{email}</p>
                  <div className="mt-2">
                    <Badge>{`${course}º Curso`}</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Cambiar foto
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Editar Perfil</CardTitle>
                <CardDescription>Actualiza tu información personal</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Curso actual</Label>
                    <select
                      id="course"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="1">Primer curso</option>
                      <option value="2">Segundo curso</option>
                      <option value="3">Tercer curso</option>
                      <option value="4">Cuarto curso</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar cambios
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Progreso del Grado</CardTitle>
                <CardDescription>Tu avance en el Grado de Tecnologías Interactivas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Créditos completados</span>
                    <span className="text-sm font-medium">{`${completedCredits}/${totalCredits} ECTS`}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">{`${progressPercentage}% completado`}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Resumen por cursos</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((year) => {
                      const yearSubjects = mockSubjects.filter((s) => s.year === year)
                      const yearTotalCredits = yearSubjects.reduce((acc, s) => acc + s.credits, 0)
                      const yearCompletedCredits = yearSubjects
                        .filter((s) => completedSubjects.includes(s.id))
                        .reduce((acc, s) => acc + s.credits, 0)
                      const yearProgress = Math.round((yearCompletedCredits / yearTotalCredits) * 100)

                      return (
                        <div key={year} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{`${year}º Curso`}</span>
                            <span>{`${yearCompletedCredits}/${yearTotalCredits} ECTS`}</span>
                          </div>
                          <Progress value={yearProgress} className="h-1.5" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Asignaturas Cursadas</CardTitle>
                <CardDescription>Marca las asignaturas que has superado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2].map((year) => (
                  <div key={year} className="space-y-4">
                    <h3 className="font-medium">{`${year}º Curso`}</h3>
                    <Separator />

                    <div className="space-y-4">
                      {[1, 2].map((semester) => (
                        <div key={`${year}-${semester}`} className="space-y-2">
                          <h4 className="text-sm font-medium">{`Semestre ${semester}`}</h4>
                          <div className="space-y-2">
                            {mockSubjects
                              .filter((s) => s.year === year && s.semester === semester)
                              .map((subject) => (
                                <div key={subject.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`subject-${subject.id}`}
                                    checked={completedSubjects.includes(subject.id)}
                                    onCheckedChange={() => handleSubjectToggle(subject.id)}
                                  />
                                  <Label htmlFor={`subject-${subject.id}`} className="flex-1 text-sm cursor-pointer">
                                    {subject.name}
                                  </Label>
                                  <span className="text-xs text-muted-foreground">{`${subject.credits} ECTS`}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar progreso
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

