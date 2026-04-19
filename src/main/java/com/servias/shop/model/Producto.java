package com.servias.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private Double precio;
    private Integer stock;
    @Enumerated(EnumType.STRING)
    private TipoRopa tipoRopa;
    private String talla;

    public Producto() {
    }

    public Producto(String descripcion, Integer id, String imagen, String nombre, Double precio, Integer stock, TipoRopa tipoRopa, String talla) {
        this.descripcion = descripcion;
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.tipoRopa = tipoRopa;
        this.talla = talla;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public TipoRopa getTipoRopa() {
        return tipoRopa;
    }

    public void setTipoRopa(TipoRopa tipoRopa) {
        this.tipoRopa = tipoRopa;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("producto{");
        sb.append("id=").append(id);
        sb.append(", nombre=").append(nombre);
        sb.append(", descripcion=").append(descripcion);
        sb.append(", imagen=").append(imagen);
        sb.append(", precio=").append(precio);
        sb.append(", stock=").append(stock);
        sb.append(", tipoRopa=").append(tipoRopa);
        sb.append(", talla=").append(talla);
        sb.append('}');
        return sb.toString();
    }

}
