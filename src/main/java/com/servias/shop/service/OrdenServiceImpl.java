package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.servias.shop.model.Orden;
import com.servias.shop.repository.OrdenRepository;

@Service
public class OrdenServiceImpl implements OrdenService {

    private final OrdenRepository ordenRepository;

    public OrdenServiceImpl(OrdenRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    @Override
    public List<Orden> findAll() {
        return ordenRepository.findAll();
    }

    @Override
    public List<Orden> findByUsuarioId(Integer usuarioId) {
        return ordenRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public Optional<Orden> findById(Integer id) {
        return ordenRepository.findById(id);
    }

    @Override
    public Orden save(Orden orden) {
        return ordenRepository.save(orden);
    }

    @Override
    public Orden update(Integer id, Orden orden) {
        orden.setId(id);
        return ordenRepository.save(orden);
    }

    @Override
    public void delete(Integer id) {
        ordenRepository.deleteById(id);
    }
}
