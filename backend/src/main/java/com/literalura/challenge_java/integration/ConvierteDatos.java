package com.literalura.challenge_java.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class ConvierteDatos {

    private final ObjectMapper objectMapper;

    public ConvierteDatos() {
        this.objectMapper = new ObjectMapper();
    }

    public <T> T obtenerDatos(String json, Class<T> clase) {
        try {
            return objectMapper.readValue(json, clase);
        } catch (Exception e) {
            throw new RuntimeException("Error al convertir JSON a objeto: " + e.getMessage(), e);
        }
    }
}
