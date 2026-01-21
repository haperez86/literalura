# Literalura - Sistema de Gestión Literaria

Proyecto full-stack para la gestión de una librería literaria con backend en Spring Boot y frontend en React.

## 🏗️ Arquitectura

- **Backend**: Spring Boot 4.0.1 con Java 17
- **Frontend**: React 18 con Vite
- **Base de Datos**: PostgreSQL
- **Despliegue**: Docker + Docker Compose

## 🌿 Ramas del Repositorio

### `main` (Producción)
- Configuración optimizada para producción
- Despliegue en EC2
- Variables de entorno para producción
- Logs minimizados
- Base de datos persistente

### `develop` (Desarrollo)
- Configuración para desarrollo local
- Base de datos en memoria (create-drop)
- Logs detallados
- Hot reload activado
- Herramientas de desarrollo

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar el repositorio y cambiar a la rama de desarrollo:**
```bash
git clone https://github.com/haperez86/literalura.git
cd literalura
git checkout develop
```

2. **Iniciar con Docker Compose:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

3. **Acceder a las aplicaciones:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Base de datos: localhost:5433

### Desarrollo Manual

**Backend:**
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

**Frontend:**
```bash
cd literalura-frontend
npm install
npm run dev
```

## 🌐 Despliegue en Producción (EC2)

### Configuración Inicial

1. **Configurar el servidor EC2:**
```bash
chmod +x scripts/setup-ec2.sh
./scripts/setup-ec2.sh
```

2. **Actualizar variables de entorno:**
   - Editar `EC2_HOST` en los scripts
   - Configurar `DB_PASSWORD` en `.env`

### Despliegue

1. **Cambiar a la rama main:**
```bash
git checkout main
```

2. **Ejecutar despliegue:**
```bash
chmod +x scripts/deploy-ec2.sh
./scripts/deploy-ec2.sh
```

## 📁 Estructura de Configuración

### Backend
- `application.properties` - Configuración base
- `application-dev.properties` - Configuración desarrollo
- `application-prod.properties` - Configuración producción

### Frontend
- `.env.development` - Variables de entorno desarrollo
- `.env.production` - Variables de entorno producción
- `vite.config.js` - Configuración Vite por entorno

### Docker
- `docker-compose.dev.yml` - Servicios desarrollo
- `docker-compose.prod.yml` - Servicios producción
- `Dockerfile.dev` - Imagen desarrollo
- `Dockerfile.prod` - Imagen producción

## 🔧 Variables de Entorno

### Desarrollo
- **Backend**: `SPRING_PROFILES_ACTIVE=dev`
- **Frontend**: `VITE_API_BASE_URL=http://localhost:8080`

### Producción
- **Backend**: `SPRING_PROFILES_ACTIVE=prod`
- **Frontend**: `VITE_API_BASE_URL=https://api.literalura.com`
- **Base de Datos**: `DB_USERNAME`, `DB_PASSWORD`

## 📊 Monitoreo y Logs

### Desarrollo
- Logs SQL habilitados
- Nivel de logging: DEBUG
- Hot reload activo

### Producción
- Logs SQL deshabilitados
- Nivel de logging: INFO
- Health checks configurados

## 🔄 Flujo de Trabajo

1. **Desarrollo**: Trabajar en rama `develop`
2. **Testing**: Probar configuración local
3. **Merge**: Hacer merge a `main`
4. **Despliegue**: Ejecutar script de despliegue

## 🛠️ Comandos Útiles

### Docker
```bash
# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.dev.yml restart

# Limpiar
docker-compose -f docker-compose.dev.yml down -v
```

### Git
```bash
# Cambiar entre ramas
git checkout develop  # Desarrollo
git checkout main     # Producción

# Sincronizar cambios
git pull origin main
git pull origin develop
```

## 📝 Notas

- La rama `develop` usa base de datos en puerto 5433
- La rama `main` usa base de datos en puerto 5432
- Los scripts de EC2 requieren configuración de SSH keys
- Las variables de entorno deben ser configuradas según el entorno
