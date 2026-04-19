package com.servias.shop.service;

import java.util.Optional;

import com.servias.shop.model.Producto;

public interface ProductoService {

    public Producto save(Producto producto);

    public Optional<Producto> get(Integer id);

    public void update(Producto producto);

    public void delete(Integer id);
}
