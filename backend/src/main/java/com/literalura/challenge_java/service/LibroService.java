package com.literalura.challenge_java.service;


import com.literalura.challenge_java.dto.DatosLibro;
import com.literalura.challenge_java.dto.DatosRespuestaAPI;
import com.literalura.challenge_java.dto.LibroDTO;
import com.literalura.challenge_java.entity.Autor;
import com.literalura.challenge_java.entity.Libro;
import com.literalura.challenge_java.integration.ConsumoAPI;
import com.literalura.challenge_java.integration.ConvierteDatos;
import com.literalura.challenge_java.mapper.AutorMapper;
import com.literalura.challenge_java.mapper.LibroMapper;
import com.literalura.challenge_java.repository.AutorRepository;
import com.literalura.challenge_java.repository.LibroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LibroService {

    private static final String URL_BASE = "https://gutendex.com/books/";

    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;
    private final LibroMapper libroMapper;
    private final AutorMapper autorMapper;
    private final ConsumoAPI consumoAPI;
    private final ConvierteDatos convierteDatos;

    public LibroService(LibroRepository libroRepository,
                        AutorRepository autorRepository,
                        LibroMapper libroMapper,
                        AutorMapper autorMapper,
                        ConsumoAPI consumoAPI,
                        ConvierteDatos convierteDatos) {
        this.libroRepository = libroRepository;
        this.autorRepository = autorRepository;
        this.libroMapper = libroMapper;
        this.autorMapper = autorMapper;
        this.consumoAPI = consumoAPI;
        this.convierteDatos = convierteDatos;
    }

    /**
     * Busca un libro por título en la API externa y lo guarda en la BD
     */
    public LibroDTO buscarYGuardarLibro(String titulo) {
        // Verificar si ya existe en la BD
        Optional<Libro> libroExistente = libroRepository.findByTituloContainingIgnoreCase(titulo);
        if (libroExistente.isPresent()) {
            return libroMapper.toDTO(libroExistente.get());
        }

        // Buscar en API externa
        String url = URL_BASE + "?search=" + URLEncoder.encode(titulo, StandardCharsets.UTF_8);
        String json = consumoAPI.obtenerDatos(url);
        DatosRespuestaAPI respuesta = convierteDatos.obtenerDatos(json, DatosRespuestaAPI.class);

        if (respuesta.resultados() == null || respuesta.resultados().isEmpty()) {
            throw new RuntimeException("No se encontró el libro: " + titulo);
        }

        // Tomar el primer resultado
        DatosLibro datosLibro = respuesta.resultados().get(0);

        // Obtener o crear el autor
        Autor autor = obtenerOCrearAutor(datosLibro);

        // Crear y guardar el libro
        Libro libro = libroMapper.toEntity(datosLibro, autor);
        Libro libroGuardado = libroRepository.save(libro);

        return libroMapper.toDTO(libroGuardado);
    }

    /**
     * Obtiene un autor existente o crea uno nuevo
     */
    private Autor obtenerOCrearAutor(DatosLibro datosLibro) {
        if (datosLibro.autores() == null || datosLibro.autores().isEmpty()) {
            throw new RuntimeException("El libro no tiene autor asociado");
        }

        String nombreAutor = datosLibro.autores().get(0).nombre();

        return autorRepository.findByNombre(nombreAutor)
                .orElseGet(() -> {
                    Autor nuevoAutor = autorMapper.toEntity(datosLibro.autores().get(0));
                    return autorRepository.save(nuevoAutor);
                });
    }

    /**
     * Lista todos los libros registrados
     */
    @Transactional(readOnly = true)
    public List<LibroDTO> listarTodos() {
        List<Libro> libros = libroRepository.findAll();
        return libroMapper.toDTOList(libros);
    }

    /**
     * Obtiene un libro por su ID
     */
    @Transactional(readOnly = true)
    public LibroDTO obtenerPorId(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con ID: " + id));
        return libroMapper.toDTO(libro);
    }

    /**
     * Lista libros por idioma
     */
    @Transactional(readOnly = true)
    public List<LibroDTO> listarPorIdioma(String idioma) {
        List<Libro> libros = libroRepository.findByIdioma(idioma);
        return libroMapper.toDTOList(libros);
    }

    /**
     * Obtiene el Top 10 de libros más descargados
     */
    @Transactional(readOnly = true)
    public List<LibroDTO> obtenerTop10MasDescargados() {
        List<Libro> top10 = libroRepository.findTop10ByOrderByNumeroDeDescargasDesc();
        return libroMapper.toDTOList(top10);
    }

    /**
     * Elimina un libro por su ID
     */
    public void eliminar(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new RuntimeException("Libro no encontrado con ID: " + id);
        }
        libroRepository.deleteById(id);
    }
}

