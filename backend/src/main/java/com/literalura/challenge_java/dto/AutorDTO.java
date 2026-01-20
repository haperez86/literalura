package com.literalura.challenge_java.dto;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutorDTO {
    private Long id;
    private String nombre;
    private Integer fechaDeNacimiento;
    private Integer fechaDeFallecimiento;
    private Integer cantidadLibros;
}
