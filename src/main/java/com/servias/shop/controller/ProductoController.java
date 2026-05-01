package com.servias.shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.servias.shop.model.Producto;
import com.servias.shop.model.TipoRopa;
import com.servias.shop.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> listar(@RequestParam(required = false) TipoRopa tipoRopa) {
        if (tipoRopa != null) {
            return productoService.findByTipoRopa(tipoRopa);
        }
        return productoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtener(@PathVariable Integer id) {
        return productoService.get(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        Producto creado = productoService.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Integer id, @RequestBody Producto producto) {
        if (productoService.get(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productoService.update(id, producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (productoService.get(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
