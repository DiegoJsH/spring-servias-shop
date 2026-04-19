package com.servias.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.servias.shop.model.Producto;
import com.servias.shop.model.TipoRopa;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    List<Producto> findByTipoRopa(TipoRopa tipoRopa);
}
