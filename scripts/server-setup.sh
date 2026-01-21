#!/bin/bash

# Script de configuración y despliegue para servidor EC2
set -e

echo "🚀 Configurando y desplegendo Literalura en EC2..."

# 1. Instalar Docker
echo "📦 Instalando Docker..."
sudo apt update -y
sudo apt install -y docker.io

# 2. Iniciar y habilitar Docker
echo "🔄 Iniciando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# 3. Instalar Docker Compose
echo "📦 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# 4. Agregar usuario al grupo docker
echo "👤 Configurando permisos Docker..."
sudo usermod -a -G docker ubuntu

# 5. Configurar firewall
echo "🔥 Configurando firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 8080
sudo ufw --force enable

# 6. Crear directorios necesarios
echo "📁 Creando directorios..."
mkdir -p /home/ubuntu/backups

# 7. Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
cat > .env << 'EOF'
DB_USERNAME=postgres
DB_PASSWORD=Literalura2024!
EOF

# 8. Detener servicios existentes (si hay)
echo "🛑 Deteniendo servicios existentes..."
docker-compose -f docker-compose.prod.yml down || true

# 9. Construir imágenes
echo "🔨 Construyendo imágenes Docker..."
docker-compose -f docker-compose.prod.yml build --no-cache

# 10. Iniciar servicios
echo "🔄 Iniciando servicios..."
docker-compose -f docker-compose.prod.yml up -d

# 11. Esperar a que los servicios estén listos
echo "⏳ Esperando que los servicios inicien..."
sleep 30

# 12. Verificar estado
echo "🔍 Verificando estado de los servicios..."
docker-compose -f docker-compose.prod.yml ps

# 13. Health check
echo "🏥 Realizando verificación de salud..."
sleep 10

# Verificar si los puertos están escuchando
echo "📡 Verificando puertos..."
sudo netstat -tlnp | grep -E ':(80|443|8080)' || echo "Esperando puertos..."

echo "✅ Despliegue completado!"
echo "🌐 Frontend: http://3.238.201.72"
echo "🔧 Backend: http://3.238.201.72:8080"
echo "📊 Para ver logs: docker-compose -f docker-compose.prod.yml logs -f"
