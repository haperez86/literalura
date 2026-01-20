package com.literalura.challenge_java.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibroDTO {
    private Long id;
    private String titulo;
    private String idioma;
    private Double numeroDeDescargas;
    private String autorNombre;
}

