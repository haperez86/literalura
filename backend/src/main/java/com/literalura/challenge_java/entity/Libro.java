package com.literalura.challenge_java.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "libros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String titulo;

    private String idioma;

    private Double numeroDeDescargas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", nullable = false)
    private Autor autor;

    @Override
    public String toString() {
        return "Libro{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", idioma='" + idioma + '\'' +
                ", numeroDeDescargas=" + numeroDeDescargas +
                ", autor=" + (autor != null ? autor.getNombre() : "null") +
                '}';
    }
}
