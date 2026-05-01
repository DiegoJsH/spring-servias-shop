package com.servias.shop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servias.shop.repository.ProductoRepository;

@RestController
@RequestMapping("/api/admin")
public class AdministradorController {

    private final ProductoRepository productoRepository;

    public AdministradorController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public Map<String, Object> resumen() {
        Map<String, Object> response = new HashMap<>();
        response.put("modulo", "administrador");
        response.put("estado", "ok");
        response.put("totalProductos", productoRepository.count());
        return response;
    }
}
