# 🎓 AIGenTI: Asistente IA para Estudiantes del Grado de Tecnologías Interactivas

## 🚀 Descripción
AIGenTI es un asistente de Inteligencia Artificial diseñado específicamente para estudiantes del Grado de Tecnologías Interactivas de la UPV. Esta aplicación moderna combina tecnologías punteras para ofrecer una experiencia de usuario excepcional y un soporte académico integral.

## ✨ Características Principales

### 🤖 Asistente IA
- Chatbot inteligente para resolver dudas académicas
- Respuestas personalizadas sobre asignaturas, profesores y campus
- Disponibilidad 24/7 para consultas

### 📚 Sistema de FAQs
- Preguntas frecuentes organizadas por categorías
- Información actualizada sobre el grado
- Búsqueda inteligente de respuestas

### 👥 Sistema de Usuarios
- Registro e inicio de sesión seguros
- Perfiles personalizados
- Gestión de información académica

### 💬 Chat entre Estudiantes
- Salas de chat por cursos
- Comunicación en tiempo real
- Compartición de recursos

### 📱 Interfaz Adaptativa
- Diseño responsive para todos los dispositivos
- Interfaz accesible y amigable
- Modo oscuro/claro

## 🛠 Tecnologías
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- AI SDK para el chatbot
- NextAuth.js para autenticación
- Prisma como ORM
- PostgreSQL para la base de datos

## 📋 Prerrequisitos
- Node.js (v18 o superior)
- pnpm (recomendado) o npm
- PostgreSQL
- Variables de entorno configuradas

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/vjrivmon/aigenti.git

# Entrar al directorio
cd aigenti

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar la base de datos
pnpm prisma migrate dev

# Iniciar el servidor de desarrollo
pnpm dev
```

## 📁 Estructura del Proyecto
```
├── app/                # Directorio principal de la aplicación
│   ├── (auth)/        # Rutas de autenticación
│   ├── (dashboard)/   # Área privada del usuario
│   └── api/           # Endpoints de la API
├── components/         # Componentes reutilizables
├── hooks/             # Custom hooks
├── lib/               # Utilidades y configuraciones
│   ├── auth/          # Configuración de autenticación
│   └── db/           # Configuración de base de datos
├── public/            # Archivos estáticos
└── styles/            # Estilos globales
```

## 🤝 Contribución
1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'feat: añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## 📝 Convenciones de Código
- Utilizamos ESLint y Prettier para mantener un código consistente
- Seguimos los principios SOLID y Clean Code
- Commits semánticos siguiendo Conventional Commits
- Documentación inline en componentes críticos
- Tests unitarios para funcionalidades core

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores
- Vicente Rivas Monferrer - Desarrollo inicial
- Colaboradores del Grado de Tecnologías Interactivas

## 🙏 Agradecimientos
- UPV por el apoyo institucional
- Shadcn/ui por los componentes
- Vercel por el hosting
- La comunidad de Next.js y estudiantes beta testers 