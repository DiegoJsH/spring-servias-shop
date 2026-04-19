package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import com.servias.shop.model.Orden;

public interface OrdenService {

    List<Orden> findAll();

    List<Orden> findByUsuarioId(Integer usuarioId);

    Optional<Orden> findById(Integer id);

    Orden save(Orden orden);

    Orden update(Integer id, Orden orden);

    void delete(Integer id);
}
