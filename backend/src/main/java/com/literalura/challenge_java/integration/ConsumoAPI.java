package com.literalura.challenge_java.integration;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class ConsumoAPI {

    private final HttpClient httpClient;

    public ConsumoAPI() {
        this.httpClient = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
    }

    /**
     * Realiza una petición GET a la URL especificada y retorna el JSON como String
     */
    public String obtenerDatos(String url) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return response.body();
            } else {
                throw new RuntimeException("Error en la petición HTTP: " + response.statusCode());
            }
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error al consumir la API: " + e.getMessage(), e);
        }
    }
}
