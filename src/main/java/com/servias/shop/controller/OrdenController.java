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

import com.servias.shop.model.Orden;
import com.servias.shop.service.OrdenService;

@RestController
@RequestMapping("/ordenes")
public class OrdenController {

    private final OrdenService ordenService;

    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    @GetMapping
    public List<Orden> listar(@RequestParam(required = false) Integer usuarioId) {
        if (usuarioId != null) {
            return ordenService.findByUsuarioId(usuarioId);
        }
        return ordenService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtener(@PathVariable Integer id) {
        return ordenService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden orden) {
        Orden creado = ordenService.save(orden);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orden> actualizar(@PathVariable Integer id, @RequestBody Orden orden) {
        if (ordenService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ordenService.update(id, orden));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (ordenService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ordenService.delete(id);
        return ResponseEntity.noContent().build();
    }
}