package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.servias.shop.model.DetalleOrden;
import com.servias.shop.repository.DetalleOrdenRepository;

@Service
public class DetalleOrdenServiceImpl implements DetalleOrdenService {

    private final DetalleOrdenRepository detalleOrdenRepository;

    public DetalleOrdenServiceImpl(DetalleOrdenRepository detalleOrdenRepository) {
        this.detalleOrdenRepository = detalleOrdenRepository;
    }

    @Override
    public List<DetalleOrden> findAll() {
        return detalleOrdenRepository.findAll();
    }

    @Override
    public List<DetalleOrden> findByOrdenId(Integer ordenId) {
        return detalleOrdenRepository.findByOrdenId(ordenId);
    }

    @Override
    public Optional<DetalleOrden> findById(Integer id) {
        return detalleOrdenRepository.findById(id);
    }

    @Override
    public DetalleOrden save(DetalleOrden detalleOrden) {
        return detalleOrdenRepository.save(detalleOrden);
    }

    @Override
    public DetalleOrden update(Integer id, DetalleOrden detalleOrden) {
        detalleOrden.setId(id);
        return detalleOrdenRepository.save(detalleOrden);
    }

    @Override
    public void delete(Integer id) {
        detalleOrdenRepository.deleteById(id);
    }
}
