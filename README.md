# Literalura - Sistema de Gestión Literaria

Proyecto full-stack para la gestión de una librería literaria con backend en Spring Boot y frontend en React.

## 📖 Descripción del Challenge

Literalura es un desafío que simula la gestión de una librería digital, permitiendo:
- **Gestión de Autores**: Registro y consulta de información de autores
- **Gestión de Libros**: Almacenamiento y categorización de libros
- **API RESTful**: Endpoints para operaciones CRUD
- **Interfaz Moderna**: Frontend React con experiencia de usuario optimizada

## 🏗️ Arquitectura

- **Backend**: Spring Boot 4.0.1 con Java 17
- **Frontend**: React 18 con Vite
- **Base de Datos**: PostgreSQL
- **Despliegue**: Docker + Docker Compose

## 🔍 Estructura del Código

### Backend (Spring Boot)

#### Entidades Principales
```java
@Entity
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String nacionalidad;
    private LocalDate fechaNacimiento;
    
    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL)
    private List<Libro> libros;
}

@Entity
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    private String isbn;
    private Integer anioPublicacion;
    private String genero;
    
    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;
}
```

#### Repositorios JPA
```java
@Repository
public interface AutorRepository extends JpaRepository<Autor, Long> {
    List<Autor> findByNacionalidad(String nacionalidad);
    List<Autor> findByNombreContainingIgnoreCase(String nombre);
}

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    List<Libro> findByGenero(String genero);
    List<Libro> findByAnioPublicacionBetween(Integer inicio, Integer fin);
    List<Libro> findByAutorId(Long autorId);
}
```

#### Servicios de Negocio
```java
@Service
@Transactional
public class AutorService {
    
    @Autowired
    private AutorRepository autorRepository;
    
    public List<Autor> findAll() {
        return autorRepository.findAll();
    }
    
    public Autor save(Autor autor) {
        return autorRepository.save(autor);
    }
    
    public List<Autor> findByNacionalidad(String nacionalidad) {
        return autorRepository.findByNacionalidad(nacionalidad);
    }
    
    public Optional<Autor> findById(Long id) {
        return autorRepository.findById(id);
    }
    
    public void deleteById(Long id) {
        autorRepository.deleteById(id);
    }
}

@Service
@Transactional
public class LibroService {
    
    @Autowired
    private LibroRepository libroRepository;
    
    public List<Libro> findAll() {
        return libroRepository.findAll();
    }
    
    public Libro save(Libro libro) {
        return libroRepository.save(libro);
    }
    
    public List<Libro> findByGenero(String genero) {
        return libroRepository.findByGenero(genero);
    }
    
    public List<Libro> findByAutor(Long autorId) {
        return libroRepository.findByAutorId(autorId);
    }
}
```

#### Controladores REST
```java
@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "*")
public class AutorController {
    
    @Autowired
    private AutorService autorService;
    
    @GetMapping
    public ResponseEntity<List<Autor>> findAll() {
        List<Autor> autores = autorService.findAll();
        return ResponseEntity.ok(autores);
    }
    
    @PostMapping
    public ResponseEntity<Autor> create(@RequestBody Autor autor) {
        Autor savedAutor = autorService.save(autor);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAutor);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Autor> findById(@PathVariable Long id) {
        return autorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/nacionalidad/{nacionalidad}")
    public ResponseEntity<List<Autor>> findByNacionalidad(@PathVariable String nacionalidad) {
        List<Autor> autores = autorService.findByNacionalidad(nacionalidad);
        return ResponseEntity.ok(autores);
    }
}

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {
    
    @Autowired
    private LibroService libroService;
    
    @GetMapping
    public ResponseEntity<List<Libro>> findAll() {
        List<Libro> libros = libroService.findAll();
        return ResponseEntity.ok(libros);
    }
    
    @PostMapping
    public ResponseEntity<Libro> create(@RequestBody Libro libro) {
        Libro savedLibro = libroService.save(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLibro);
    }
    
    @GetMapping("/genero/{genero}")
    public ResponseEntity<List<Libro>> findByGenero(@PathVariable String genero) {
        List<Libro> libros = libroService.findByGenero(genero);
        return ResponseEntity.ok(libros);
    }
    
    @GetMapping("/autor/{autorId}")
    public ResponseEntity<List<Libro>> findByAutor(@PathVariable Long autorId) {
        List<Libro> libros = libroService.findByAutor(autorId);
        return ResponseEntity.ok(libros);
    }
}
```

### Frontend (React)

#### Componentes Principales
```jsx
// components/AutorList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutorList = () => {
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAutores();
    }, []);

    const fetchAutores = async () => {
        try {
            const response = await axios.get('/api/autores');
            setAutores(response.data);
        } catch (error) {
            console.error('Error fetching autores:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="autor-list">
            <h2>Lista de Autores</h2>
            {autores.map(autor => (
                <div key={autor.id} className="autor-card">
                    <h3>{autor.nombre}</h3>
                    <p>Nacionalidad: {autor.nacionalidad}</p>
                    <p>Fecha de Nacimiento: {autor.fechaNacimiento}</p>
                </div>
            ))}
        </div>
    );
};

export default AutorList;
```

```jsx
// components/LibroList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LibroList = () => {
    const [libros, setLibros] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = async () => {
        try {
            const response = await axios.get('/api/libros');
            setLibros(response.data);
        } catch (error) {
            console.error('Error fetching libros:', error);
        }
    };

    const filteredLibros = libros.filter(libro => 
        libro.titulo.toLowerCase().includes(filter.toLowerCase()) ||
        libro.genero.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="libro-list">
            <h2>Lista de Libros</h2>
            <input 
                type="text" 
                placeholder="Buscar por título o género..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="search-input"
            />
            {filteredLibros.map(libro => (
                <div key={libro.id} className="libro-card">
                    <h3>{libro.titulo}</h3>
                    <p>Autor: {libro.autor?.nombre}</p>
                    <p>Género: {libro.genero}</p>
                    <p>Año: {libro.anioPublicacion}</p>
                    <p>ISBN: {libro.isbn}</p>
                </div>
            ))}
        </div>
    );
};

export default LibroList;
```

#### App Principal
```jsx
// App.jsx
import React from 'react';
import AutorList from './components/AutorList';
import LibroList from './components/LibroList';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>📚 Literalura - Gestión Literaria</h1>
            </header>
            <main className="app-main">
                <section className="autores-section">
                    <AutorList />
                </section>
                <section className="libros-section">
                    <LibroList />
                </section>
            </main>
        </div>
    );
}

export default App;
```

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
