# AIGenTI - Asistente Virtual para GTI UPV

AIGenTI es una aplicación web diseñada para ayudar a los estudiantes del Grado en Tecnologías Interactivas de la Universidad Politécnica de Valencia. La aplicación proporciona un asistente virtual inteligente, información actualizada sobre el grado y una plataforma de comunicación entre estudiantes.

## Características principales

- 🤖 **Chatbot Inteligente**: Asistente virtual especializado en resolver dudas sobre el grado
- 📚 **FAQ**: Sección de preguntas frecuentes sobre la carrera, campus y asignaturas
- 👥 **Perfil de Usuario**: Sistema de registro y autenticación para estudiantes
- 💬 **Chat Comunitario**: Espacio para que los estudiantes se comuniquen entre sí
- 📱 **Diseño Responsive**: Interfaz adaptable a cualquier dispositivo

## Tecnologías utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: MongoDB
- **Autenticación**: NextAuth.js
- **IA**: OpenAI API
- **Comunicación en tiempo real**: Socket.io

## Requisitos previos

- Node.js 18 o superior
- MongoDB
- Cuenta de OpenAI para la API

## Configuración del entorno

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/aigenti.git
cd aigenti
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Crea un archivo .env con las siguientes variables:
\`\`\`
DATABASE_URL="tu-url-de-mongodb"
NEXTAUTH_SECRET="tu-secreto"
OPENAI_API_KEY="tu-api-key-de-openai"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

4. Inicializa la base de datos:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

5. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## Estructura del proyecto

\`\`\`
src/
  ├── app/              # Rutas y páginas de la aplicación
  ├── components/       # Componentes reutilizables
  ├── providers/        # Proveedores de contexto
  ├── lib/             # Utilidades y configuraciones
  └── types/           # Definiciones de tipos
prisma/
  └── schema.prisma    # Esquema de la base de datos
\`\`\`

## Futuras mejoras

- [ ] Implementar chat grupal por asignaturas
- [ ] Añadir sistema de notificaciones
- [ ] Integrar calendario académico
- [ ] Añadir sección de recursos y materiales
- [ ] Implementar sistema de mentoría entre estudiantes
- [ ] Añadir soporte para múltiples idiomas
- [ ] Integrar sistema de feedback y valoraciones
- [ ] Implementar panel de administración

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios que te gustaría realizar.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para más información o consultas, por favor contacta con el equipo de desarrollo a través de [correo@ejemplo.com]. 