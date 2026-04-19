package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import com.servias.shop.model.Producto;
import com.servias.shop.model.TipoRopa;

public interface ProductoService {

    List<Producto> findAll();

    List<Producto> findByTipoRopa(TipoRopa tipoRopa);

    Producto save(Producto producto);

    Optional<Producto> get(Integer id);

    Producto update(Integer id, Producto producto);

    void delete(Integer id);
}
