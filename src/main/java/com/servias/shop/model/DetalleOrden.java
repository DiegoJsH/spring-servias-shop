package com.servias.shop.model;

public class DetalleOrden {

    private Integer id;
    private String nombre;
    private Integer cantidad;
    private double precio;
    private double total;

    public DetalleOrden() {
    }

    public DetalleOrden(Integer cantidad, Integer id, String nombre, double precio, double total) {
        this.cantidad = cantidad;
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.total = total;
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

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("DetalleOrden{");
        sb.append("id=").append(id);
        sb.append(", nombre=").append(nombre);
        sb.append(", cantidad=").append(cantidad);
        sb.append(", precio=").append(precio);
        sb.append(", total=").append(total);
        sb.append('}');
        return sb.toString();
    }

}
