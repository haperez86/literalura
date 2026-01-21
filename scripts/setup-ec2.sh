#!/bin/bash

# Script de configuración inicial para EC2
set -e

echo "🔧 Configurando servidor EC2 para Literalura..."

# Variables
EC2_USER="ubuntu"
EC2_HOST="3.238.201.72"
SSH_KEY="literalura.pem"  # Asegúrate de que este archivo esté en el mismo directorio
APP_DIR="/home/ubuntu/literalura"

# Instalar Docker y Docker Compose
echo "📦 Instalando Docker..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "sudo apt update -y && sudo apt install -y docker.io && sudo systemctl start docker && sudo systemctl enable docker"

echo "📦 Instalando Docker Compose..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose"

# Crear directorio de la aplicación
echo "📁 Creando directorios..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "mkdir -p $APP_DIR && mkdir -p /home/ubuntu/backups"

# Clonar repositorio
echo "📥 Clonando repositorio..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "cd /home/ubuntu && rm -rf literalura && git clone https://github.com/haperez86/literalura.git"

# Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "cat > $APP_DIR/.env << 'EOF'
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password_here
EOF"

# Configurar firewall
echo "🔥 Configurando firewall..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "sudo apt install -y ufw && sudo ufw allow 22 && sudo ufw allow 80 && sudo ufw allow 443 && sudo ufw allow 8080 && sudo ufw --force enable"

# Agregar usuario al grupo docker
echo "👤 Configurando permisos Docker..."
ssh -i $SSH_KEY $EC2_USER@$EC2_HOST "sudo usermod -a -G docker $EC2_USER"

echo "✅ Configuración inicial completada!"
echo "📝 Siguiente pasos:"
echo "   1. Actualiza la variable EC2_HOST en los scripts"
echo "   2. Configura las variables de entorno en .env"
echo "   3. Ejecuta: ./scripts/deploy-ec2.sh"
