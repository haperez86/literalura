package com.literalura.challenge_java.mapper;

import com.literalura.challenge_java.dto.AutorDTO;
import com.literalura.challenge_java.dto.DatosAutor;
import com.literalura.challenge_java.entity.Autor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AutorMapper {

    /**
     * Convierte Entity Autor a AutorDTO (para respuestas al frontend)
     */
    public AutorDTO toDTO(Autor autor) {
        return AutorDTO.builder()
                .id(autor.getId())
                .nombre(autor.getNombre())
                .fechaDeNacimiento(autor.getFechaDeNacimiento())
                .fechaDeFallecimiento(autor.getFechaDeFallecimiento())
                .cantidadLibros(autor.getLibros() != null ? autor.getLibros().size() : 0)
                .build();
    }

    /**
     * Convierte lista de Entity Autor a lista de AutorDTO
     */
    public List<AutorDTO> toDTOList(List<Autor> autores) {
        return autores.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convierte DatosAutor (record de API) a Entity Autor
     */
    public Autor toEntity(DatosAutor datosAutor) {
        return Autor.builder()
                .nombre(datosAutor.nombre())
                .fechaDeNacimiento(datosAutor.fechaDeNacimiento())
                .fechaDeFallecimiento(datosAutor.fechaDeFallecimiento())
                .build();
    }
}
