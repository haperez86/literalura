package com.literalura.challenge_java.service;

import com.literalura.challenge_java.dto.EstadisticaDTO;
import com.literalura.challenge_java.entity.Libro;
import com.literalura.challenge_java.repository.LibroRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;


import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class EstadisticaService {

    private final LibroRepository libroRepository;

    public EstadisticaService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    /**
     * Obtiene estadísticas de descargas usando DoubleSummaryStatistics
     */
    public EstadisticaDTO obtenerEstadisticasDescargas() {
        List<Libro> libros = libroRepository.findAll();

        if (libros.isEmpty()) {
            return EstadisticaDTO.builder()
                    .totalLibros(0L)
                    .totalDescargas(0.0)
                    .promedioDescargas(0.0)
                    .maxDescargas(0.0)
                    .minDescargas(0.0)
                    .build();
        }

        DoubleSummaryStatistics stats = libros.stream()
                .mapToDouble(Libro::getNumeroDeDescargas)
                .summaryStatistics();

        return EstadisticaDTO.builder()
                .totalLibros(stats.getCount())
                .totalDescargas(stats.getSum())
                .promedioDescargas(stats.getAverage())
                .maxDescargas(stats.getMax())
                .minDescargas(stats.getMin())
                .build();
    }

    /**
     * Cuenta libros agrupados por idioma
     */
    public Map<String, Long> contarLibrosPorIdioma() {
        return libroRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        Libro::getIdioma,
                        Collectors.counting()
                ));
    }

    /**
     * Obtiene un resumen general
     */
    public Map<String, Object> obtenerResumen() {
        List<Libro> libros = libroRepository.findAll();

        DoubleSummaryStatistics stats = libros.stream()
                .mapToDouble(Libro::getNumeroDeDescargas)
                .summaryStatistics();

        Map<String, Long> librosPorIdioma = libros.stream()
                .collect(Collectors.groupingBy(
                        Libro::getIdioma,
                        Collectors.counting()
                ));

        return Map.of(
                "totalLibros", stats.getCount(),
                "totalDescargas", stats.getSum(),
                "promedioDescargas", stats.getAverage(),
                "librosPorIdioma", librosPorIdioma
        );
    }
}

