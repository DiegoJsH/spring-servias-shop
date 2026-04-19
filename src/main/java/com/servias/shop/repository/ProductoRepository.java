package com.servias.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.servias.shop.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

}
