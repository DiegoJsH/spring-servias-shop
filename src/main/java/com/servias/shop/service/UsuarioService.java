package com.servias.shop.service;

import java.util.List;
import java.util.Optional;

import com.servias.shop.model.Usuario;

public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(Integer id);

    Usuario save(Usuario usuario);

    Usuario update(Integer id, Usuario usuario);

    void delete(Integer id);
}
