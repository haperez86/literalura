package com.literalura.challenge_java.service;

import com.literalura.challenge_java.dto.AutorDTO;
import com.literalura.challenge_java.entity.Autor;
import com.literalura.challenge_java.mapper.AutorMapper;
import com.literalura.challenge_java.repository.AutorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AutorService {

    private final AutorRepository autorRepository;
    private final AutorMapper autorMapper;

    public AutorService(AutorRepository autorRepository, AutorMapper autorMapper) {
        this.autorRepository = autorRepository;
        this.autorMapper = autorMapper;
    }

    /**
     * Lista todos los autores registrados
     */
    public List<AutorDTO> listarTodos() {
        List<Autor> autores = autorRepository.findAll();
        return autorMapper.toDTOList(autores);
    }

    /**
     * Obtiene un autor por su ID
     */
    public AutorDTO obtenerPorId(Long id) {
        Autor autor = autorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado con ID: " + id));
        return autorMapper.toDTO(autor);
    }

    /**
     * Busca autores por nombre
     */
    public List<AutorDTO> buscarPorNombre(String nombre) {
        List<Autor> autores = autorRepository.findByNombreContaining(nombre);
        return autorMapper.toDTOList(autores);
    }

    /**
     * Lista autores vivos en un año específico
     */
    public List<AutorDTO> listarVivosEnAnio(Integer anio) {
        List<Autor> autores = autorRepository.findAutoresVivosEnAnio(anio);
        return autorMapper.toDTOList(autores);
    }

    /**
     * Lista autores nacidos en un rango de años
     */
    public List<AutorDTO> listarNacidosEntre(Integer desde, Integer hasta) {
        List<Autor> autores = autorRepository.findByFechaDeNacimientoBetween(desde, hasta);
        return autorMapper.toDTOList(autores);
    }

    /**
     * Lista autores fallecidos en un rango de años
     */
    public List<AutorDTO> listarFallecidosEntre(Integer desde, Integer hasta) {
        List<Autor> autores = autorRepository.findByFechaDeFallecimientoBetween(desde, hasta);
        return autorMapper.toDTOList(autores);
    }
}
