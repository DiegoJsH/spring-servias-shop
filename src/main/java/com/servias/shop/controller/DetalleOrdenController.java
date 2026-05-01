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

import com.servias.shop.model.DetalleOrden;
import com.servias.shop.service.DetalleOrdenService;

@RestController
@RequestMapping("/detalles-orden")
public class DetalleOrdenController {

    private final DetalleOrdenService detalleOrdenService;

    public DetalleOrdenController(DetalleOrdenService detalleOrdenService) {
        this.detalleOrdenService = detalleOrdenService;
    }

    @GetMapping
    public List<DetalleOrden> listar(@RequestParam(required = false) Integer ordenId) {
        if (ordenId != null) {
            return detalleOrdenService.findByOrdenId(ordenId);
        }
        return detalleOrdenService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleOrden> obtener(@PathVariable Integer id) {
        return detalleOrdenService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DetalleOrden> crear(@RequestBody DetalleOrden detalleOrden) {
        DetalleOrden creado = detalleOrdenService.save(detalleOrden);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleOrden> actualizar(@PathVariable Integer id, @RequestBody DetalleOrden detalleOrden) {
        if (detalleOrdenService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detalleOrdenService.update(id, detalleOrden));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (detalleOrdenService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        detalleOrdenService.delete(id);
        return ResponseEntity.noContent().build();
    }
}