package com.literalura.challenge_java.mapper;


import com.literalura.challenge_java.dto.DatosLibro;
import com.literalura.challenge_java.dto.LibroDTO;
import com.literalura.challenge_java.entity.Autor;
import com.literalura.challenge_java.entity.Libro;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LibroMapper {

    /**
     * Convierte Entity Libro a LibroDTO (para respuestas al frontend)
     */
    public LibroDTO toDTO(Libro libro) {
        return LibroDTO.builder()
                .id(libro.getId())
                .titulo(libro.getTitulo())
                .idioma(libro.getIdioma())
                .numeroDeDescargas(libro.getNumeroDeDescargas())
                .autorNombre(libro.getAutor() != null ? libro.getAutor().getNombre() : null)
                .build();
    }

    /**
     * Convierte lista de Entity Libro a lista de LibroDTO
     */
    public List<LibroDTO> toDTOList(List<Libro> libros) {
        return libros.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convierte DatosLibro (record de API) a Entity Libro
     */
    public Libro toEntity(DatosLibro datosLibro, Autor autor) {
        return Libro.builder()
                .titulo(datosLibro.titulo())
                .idioma(datosLibro.idiomas() != null && !datosLibro.idiomas().isEmpty()
                        ? datosLibro.idiomas().get(0)
                        : "desconocido")
                .numeroDeDescargas(datosLibro.numeroDeDescargas())
                .autor(autor)
                .build();
    }
}
