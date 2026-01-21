#!/bin/bash

# Script de configuración inicial para EC2
set -e

echo "🔧 Configurando servidor EC2 para Literalura..."

# Variables
EC2_USER="ec2-user"
EC2_HOST="your-ec2-ip-address"
APP_DIR="/home/ec2-user/literalura"

# Instalar Docker y Docker Compose
echo "📦 Instalando Docker..."
ssh $EC2_USER@$EC2_HOST "sudo yum update -y && sudo yum install -y docker && sudo systemctl start docker && sudo systemctl enable docker"

echo "📦 Instalando Docker Compose..."
ssh $EC2_USER@$EC2_HOST "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose"

# Crear directorio de la aplicación
echo "📁 Creando directorios..."
ssh $EC2_USER@$EC2_HOST "mkdir -p $APP_DIR && mkdir -p /home/ec2-user/backups"

# Clonar repositorio
echo "📥 Clonando repositorio..."
ssh $EC2_USER@$EC2_HOST "cd /home/ec2-user && rm -rf literalura && git clone https://github.com/haperez86/literalura.git"

# Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
ssh $EC2_USER@$EC2_HOST "cat > $APP_DIR/.env << 'EOF'
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password_here
EOF"

# Configurar firewall
echo "🔥 Configurando firewall..."
ssh $EC2_USER@$EC2_HOST "sudo yum install -y firewalld && sudo systemctl start firewalld && sudo systemctl enable firewalld && sudo firewall-cmd --permanent --add-service=http && sudo firewall-cmd --permanent --add-service=https && sudo firewall-cmd --permanent --add-port=8080/tcp && sudo firewall-cmd --reload"

# Agregar usuario al grupo docker
echo "👤 Configurando permisos Docker..."
ssh $EC2_USER@$EC2_HOST "sudo usermod -a -G docker $EC2_USER"

echo "✅ Configuración inicial completada!"
echo "📝 Siguiente pasos:"
echo "   1. Actualiza la variable EC2_HOST en los scripts"
echo "   2. Configura las variables de entorno en .env"
echo "   3. Ejecuta: ./scripts/deploy-ec2.sh"
