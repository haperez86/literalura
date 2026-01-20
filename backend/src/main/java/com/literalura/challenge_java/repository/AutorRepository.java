package com.literalura.challenge_java.repository;


import com.literalura.challenge_java.entity.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Long> {

    // Buscar por nombre exacto
    Optional<Autor> findByNombre(String nombre);

    // Buscar por nombre (contiene, ignorando mayúsculas)
    Optional<Autor> findByNombreContainingIgnoreCase(String nombre);

    // Listar autores por nombre que contenga
    List<Autor> findByNombreContaining(String nombre);

    // Autores vivos en un año específico
    @Query("SELECT a FROM Autor a WHERE " +
            "a.fechaDeNacimiento <= :anio AND " +
            "(a.fechaDeFallecimiento IS NULL OR a.fechaDeFallecimiento >= :anio)")
    List<Autor> findAutoresVivosEnAnio(@Param("anio") Integer anio);

    // Autores nacidos en un rango de años
    List<Autor> findByFechaDeNacimientoBetween(Integer desde, Integer hasta);

    // Autores fallecidos en un rango de años
    List<Autor> findByFechaDeFallecimientoBetween(Integer desde, Integer hasta);

    // Verificar si existe por nombre
    boolean existsByNombre(String nombre);
}
