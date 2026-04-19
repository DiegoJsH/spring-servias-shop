package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.servias.shop.model.Producto;
import com.servias.shop.model.TipoRopa;
import com.servias.shop.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public List<Producto> findByTipoRopa(TipoRopa tipoRopa) {
        return productoRepository.findByTipoRopa(tipoRopa);
    }

    @Override
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> get(Integer id) {
        return productoRepository.findById(id);
    }

    @Override
    public Producto update(Integer id, Producto producto) {
        producto.setId(id);
        return productoRepository.save(producto);
    }

    @Override
    public void delete(Integer id) {
        productoRepository.deleteById(id);
    }
}
