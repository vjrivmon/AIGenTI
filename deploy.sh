#!/bin/bash

echo "🚀 Iniciando despliegue de AIGENTI..."

# Verificar cambios locales
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 Preparando cambios..."
    git add .
    
    # Solicitar mensaje de commit
    echo "💭 Introduce el mensaje de commit:"
    read commit_message
    
    # Realizar commit
    git commit -m "$commit_message"
    
    # Push al repositorio
    echo "☁️ Subiendo cambios a GitHub..."
    git push
    
    echo "✅ Despliegue completado con éxito!"
else
    echo "📝 No hay cambios para desplegar."
fi 