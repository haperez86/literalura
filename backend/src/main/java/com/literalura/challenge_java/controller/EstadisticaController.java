package com.literalura.challenge_java.controller;


import com.literalura.challenge_java.dto.EstadisticaDTO;
import com.literalura.challenge_java.service.EstadisticaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/estadisticas")
@CrossOrigin(origins = "http://localhost:3000")
public class EstadisticaController {

    private final EstadisticaService estadisticaService;

    public EstadisticaController(EstadisticaService estadisticaService) {
        this.estadisticaService = estadisticaService;
    }

    /**
     * Obtiene estadísticas de descargas
     * GET /api/estadisticas/descargas
     */
    @GetMapping("/descargas")
    public ResponseEntity<EstadisticaDTO> obtenerEstadisticasDescargas() {
        EstadisticaDTO estadisticas = estadisticaService.obtenerEstadisticasDescargas();
        return ResponseEntity.ok(estadisticas);
    }

    /**
     * Cuenta libros agrupados por idioma
     * GET /api/estadisticas/por-idioma
     */
    @GetMapping("/por-idioma")
    public ResponseEntity<Map<String, Long>> contarPorIdioma() {
        Map<String, Long> estadisticas = estadisticaService.contarLibrosPorIdioma();
        return ResponseEntity.ok(estadisticas);
    }

    /**
     * Obtiene un resumen general
     * GET /api/estadisticas/resumen
     */
    @GetMapping("/resumen")
    public ResponseEntity<Map<String, Object>> obtenerResumen() {
        Map<String, Object> resumen = estadisticaService.obtenerResumen();
        return ResponseEntity.ok(resumen);
    }
}

