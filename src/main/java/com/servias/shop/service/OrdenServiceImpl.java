package com.servias.shop.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servias.shop.model.Orden;
import com.servias.shop.model.DetalleOrden;
import com.servias.shop.model.Producto;
import com.servias.shop.model.Usuario;
import com.servias.shop.repository.OrdenRepository;
import com.servias.shop.repository.ProductoRepository;
import com.servias.shop.repository.UsuarioRepository;
import com.servias.shop.dto.CartRequest;
import com.servias.shop.dto.CartRequest.CartItemRequest;

@Service
public class OrdenServiceImpl implements OrdenService {

    private final OrdenRepository ordenRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public OrdenServiceImpl(OrdenRepository ordenRepository, ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository) {
        this.ordenRepository = ordenRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
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

    @Override
    public Orden procesarCarrito(CartRequest cartRequest) {
        // Obtener el usuario
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(cartRequest.getUsuarioId());
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // Crear nueva orden
        Orden orden = new Orden();
        orden.setNumero(UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        orden.setFechaCreacion(new Date());
        orden.setTotal(cartRequest.getTotal());
        orden.setUsuario(usuario);

        // Crear detalles de la orden y actualizar stock
        List<DetalleOrden> detalles = new ArrayList<>();

        for (CartItemRequest item : cartRequest.getItems()) {
            // Obtener el producto
            Optional<Producto> productoOpt = productoRepository.findById(item.getProductoId());
            if (productoOpt.isEmpty()) {
                throw new RuntimeException("Producto no encontrado: " + item.getProductoId());
            }

            Producto producto = productoOpt.get();

            // Verificar stock disponible
            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + item.getNombre());
            }

            // Crear detalle de orden
            DetalleOrden detalle = new DetalleOrden();
            detalle.setNombre(item.getNombre());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecio(item.getPrecio());
            detalle.setTotal(item.getPrecio() * item.getCantidad());
            detalle.setProducto(producto);
            detalle.setOrden(orden);

            detalles.add(detalle);

            // Reducir stock
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);
        }

        orden.setDetalles(detalles);

        // Guardar la orden
        return ordenRepository.save(orden);
    }
}
