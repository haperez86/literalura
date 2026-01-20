package com.literalura.challenge_java.controller;

import com.literalura.challenge_java.dto.LibroDTO;
import com.literalura.challenge_java.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:3000")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    /**
     * Lista todos los libros registrados
     * GET /api/libros
     */
    @GetMapping
    public ResponseEntity<List<LibroDTO>> listarTodos() {
        List<LibroDTO> libros = libroService.listarTodos();
        return ResponseEntity.ok(libros);
    }

    /**
     * Obtiene un libro por su ID
     * GET /api/libros/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> obtenerPorId(@PathVariable Long id) {
        LibroDTO libro = libroService.obtenerPorId(id);
        return ResponseEntity.ok(libro);
    }

    /**
     * Busca un libro en la API externa y lo guarda
     * GET /api/libros/buscar?titulo=pride
     */
    @GetMapping("/buscar")
    public ResponseEntity<LibroDTO> buscarLibro(@RequestParam String titulo) {
        LibroDTO libro = libroService.buscarYGuardarLibro(titulo);
        return ResponseEntity.status(HttpStatus.CREATED).body(libro);
    }

    /**
     * Lista libros por idioma
     * GET /api/libros/idioma/en
     */
    @GetMapping("/idioma/{idioma}")
    public ResponseEntity<List<LibroDTO>> listarPorIdioma(@PathVariable String idioma) {
        List<LibroDTO> libros = libroService.listarPorIdioma(idioma);
        return ResponseEntity.ok(libros);
    }

    /**
     * Obtiene el Top 10 de libros más descargados
     * GET /api/libros/top10
     */
    @GetMapping("/top10")
    public ResponseEntity<List<LibroDTO>> obtenerTop10() {
        List<LibroDTO> top10 = libroService.obtenerTop10MasDescargados();
        return ResponseEntity.ok(top10);
    }

    /**
     * Elimina un libro por su ID
     * DELETE /api/libros/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        libroService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
