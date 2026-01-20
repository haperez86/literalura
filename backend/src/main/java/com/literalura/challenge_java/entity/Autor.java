package com.literalura.challenge_java.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "autores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private Integer fechaDeNacimiento;

    private Integer fechaDeFallecimiento;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Libro> libros = new ArrayList<>();

    @Override
    public String toString() {
        return "Autor{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", fechaDeNacimiento=" + fechaDeNacimiento +
                ", fechaDeFallecimiento=" + fechaDeFallecimiento +
                ", cantidadLibros=" + (libros != null ? libros.size() : 0) +
                '}';
    }
}

