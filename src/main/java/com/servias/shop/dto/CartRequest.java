package com.servias.shop.dto;

import java.util.List;

public class CartRequest {
    private Integer usuarioId;
    private List<CartItemRequest> items;
    private double total;

    public CartRequest() {
    }

    public CartRequest(Integer usuarioId, List<CartItemRequest> items, double total) {
        this.usuarioId = usuarioId;
        this.items = items;
        this.total = total;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<CartItemRequest> getItems() {
        return items;
    }

    public void setItems(List<CartItemRequest> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    // Inner class for cart items
    public static class CartItemRequest {
        private Integer productoId;
        private String nombre;
        private String talla;
        private Integer cantidad;
        private double precio;

        public CartItemRequest() {
        }

        public CartItemRequest(Integer productoId, String nombre, String talla, Integer cantidad, double precio) {
            this.productoId = productoId;
            this.nombre = nombre;
            this.talla = talla;
            this.cantidad = cantidad;
            this.precio = precio;
        }

        public Integer getProductoId() {
            return productoId;
        }

        public void setProductoId(Integer productoId) {
            this.productoId = productoId;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getTalla() {
            return talla;
        }

        public void setTalla(String talla) {
            this.talla = talla;
        }

        public Integer getCantidad() {
            return cantidad;
        }

        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
        }

        public double getPrecio() {
            return precio;
        }

        public void setPrecio(double precio) {
            this.precio = precio;
        }
    }
}
