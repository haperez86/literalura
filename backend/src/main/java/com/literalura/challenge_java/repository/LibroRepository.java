package com.literalura.challenge_java.repository;

import com.literalura.challenge_java.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {

    // Buscar por título (contiene, ignorando mayúsculas)
    Optional<Libro> findByTituloContainingIgnoreCase(String titulo);

    // Verificar si existe por título exacto
    boolean existsByTituloIgnoreCase(String titulo);

    // Filtrar por idioma
    List<Libro> findByIdioma(String idioma);

    // Top 10 libros más descargados
    List<Libro> findTop10ByOrderByNumeroDeDescargasDesc();

    // Contar libros por idioma
    Long countByIdioma(String idioma);
}

