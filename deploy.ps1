Write-Host "🚀 Iniciando despliegue de AIGENTI..." -ForegroundColor Cyan

# Verificar cambios locales
$status = git status --porcelain

if ($status) {
    Write-Host "📦 Preparando cambios..." -ForegroundColor Yellow
    git add .
    
    # Solicitar mensaje de commit
    Write-Host "💭 Introduce el mensaje de commit:" -ForegroundColor Green
    $commit_message = Read-Host
    
    # Realizar commit
    git commit -m $commit_message
    
    # Push al repositorio
    Write-Host "☁️ Subiendo cambios a GitHub..." -ForegroundColor Blue
    git push
    
    Write-Host "✅ Despliegue completado con éxito!" -ForegroundColor Green
} else {
    Write-Host "📝 No hay cambios para desplegar." -ForegroundColor Yellow
} 