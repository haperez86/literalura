package com.literalura.challenge_java.controller;

import com.literalura.challenge_java.dto.AutorDTO;
import com.literalura.challenge_java.service.AutorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "http://localhost:3000")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    /**
     * Lista todos los autores registrados
     * GET /api/autores
     */
    @GetMapping
    public ResponseEntity<List<AutorDTO>> listarTodos() {
        List<AutorDTO> autores = autorService.listarTodos();
        return ResponseEntity.ok(autores);
    }

    /**
     * Obtiene un autor por su ID
     * GET /api/autores/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AutorDTO> obtenerPorId(@PathVariable Long id) {
        AutorDTO autor = autorService.obtenerPorId(id);
        return ResponseEntity.ok(autor);
    }

    /**
     * Busca autores por nombre
     * GET /api/autores/buscar?nombre=austen
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<AutorDTO>> buscarPorNombre(@RequestParam String nombre) {
        List<AutorDTO> autores = autorService.buscarPorNombre(nombre);
        return ResponseEntity.ok(autores);
    }

    /**
     * Lista autores vivos en un año específico
     * GET /api/autores/vivos?anio=1800
     */
    @GetMapping("/vivos")
    public ResponseEntity<List<AutorDTO>> listarVivosEnAnio(@RequestParam Integer anio) {
        List<AutorDTO> autores = autorService.listarVivosEnAnio(anio);
        return ResponseEntity.ok(autores);
    }

    /**
     * Lista autores nacidos en un rango de años
     * GET /api/autores/nacidos?desde=1800&hasta=1850
     */
    @GetMapping("/nacidos")
    public ResponseEntity<List<AutorDTO>> listarNacidosEntre(
            @RequestParam Integer desde,
            @RequestParam Integer hasta) {
        List<AutorDTO> autores = autorService.listarNacidosEntre(desde, hasta);
        return ResponseEntity.ok(autores);
    }

    /**
     * Lista autores fallecidos en un rango de años
     * GET /api/autores/fallecidos?desde=1850&hasta=1900
     */
    @GetMapping("/fallecidos")
    public ResponseEntity<List<AutorDTO>> listarFallecidosEntre(
            @RequestParam Integer desde,
            @RequestParam Integer hasta) {
        List<AutorDTO> autores = autorService.listarFallecidosEntre(desde, hasta);
        return ResponseEntity.ok(autores);
    }
}

