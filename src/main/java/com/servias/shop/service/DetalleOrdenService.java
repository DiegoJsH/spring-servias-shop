package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import com.servias.shop.model.DetalleOrden;

public interface DetalleOrdenService {

    List<DetalleOrden> findAll();

    List<DetalleOrden> findByOrdenId(Integer ordenId);

    Optional<DetalleOrden> findById(Integer id);

    DetalleOrden save(DetalleOrden detalleOrden);

    DetalleOrden update(Integer id, DetalleOrden detalleOrden);

    void delete(Integer id);
}
