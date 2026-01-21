#!/bin/bash

# Script de despliegue a producción en EC2
set -e

echo "🚀 Iniciando despliegue a producción en EC2..."

# Variables de configuración
EC2_USER="ubuntu"
EC2_HOST="3.238.201.72"
SSH_KEY="literalura.pem"  # Asegúrate de que este archivo esté en el mismo directorio
APP_DIR="/home/ubuntu/literalura"
BACKUP_DIR="/home/ubuntu/backups"

# Crear directorio de backup si no existe
echo "📦 Creando backup..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "mkdir -p $BACKUP_DIR && sudo systemctl stop literalura-backend literalura-frontend || true"

# Backup de base de datos
echo "💾 Respaldando base de datos..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "docker exec literalura-postgres-prod pg_dump -U $DB_USERNAME literalura_prod > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"

# Pull de los últimos cambios
echo "📥 Descargando últimos cambios..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "cd $APP_DIR && git pull origin main"

# Construir y desplegar
echo "🔨 Construyendo imágenes Docker..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "cd $APP_DIR && docker-compose -f docker-compose.prod.yml down && docker-compose -f docker-compose.prod.yml build --no-cache"

# Iniciar servicios
echo "🔄 Iniciando servicios..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "cd $APP_DIR && docker-compose -f docker-compose.prod.yml up -d"

# Esperar a que los servicios estén listos
echo "⏳ Esperando que los servicios estén listos..."
sleep 30

# Verificar estado de los servicios
echo "🔍 Verificando estado de los servicios..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "docker-compose -f docker-compose.prod.yml ps"

# Health check
echo "🏥 Realizando health check..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST:8080/actuator/health || echo "000")
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST/ || echo "000")

if [ "$BACKEND_STATUS" = "200" ] && [ "$FRONTEND_STATUS" = "200" ]; then
    echo "✅ Despliegue completado exitosamente!"
    echo "🌐 Frontend: http://$EC2_HOST"
    echo "🔧 Backend: http://$EC2_HOST:8080"
else
    echo "❌ Error en el despliegue. Backend status: $BACKEND_STATUS, Frontend status: $FRONTEND_STATUS"
    exit 1
fi

echo "🎉 Despliegue finalizado!"
