package com.literalura.challenge_java.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstadisticaDTO {
    private Long totalLibros;
    private Double totalDescargas;
    private Double promedioDescargas;
    private Double maxDescargas;
    private Double minDescargas;
}
