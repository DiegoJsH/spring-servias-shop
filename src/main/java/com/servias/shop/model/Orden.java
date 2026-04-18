package com.servias.shop.model;

import java.util.Date;

public class Orden {

    private Integer id;
    private String numero;
    private Date fechaCreacion;
    private Date fechaRecibida;
    private double total;

    public Orden() {
    }

    public Orden(Date fechaCreacion, Date fechaRecibida, Integer id, String numero, double total) {
        this.fechaCreacion = fechaCreacion;
        this.fechaRecibida = fechaRecibida;
        this.id = id;
        this.numero = numero;
        this.total = total;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaRecibida() {
        return fechaRecibida;
    }

    public void setFechaRecibida(Date fechaRecibida) {
        this.fechaRecibida = fechaRecibida;
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
        sb.append("orden{");
        sb.append("id=").append(id);
        sb.append(", numero=").append(numero);
        sb.append(", fechaCreacion=").append(fechaCreacion);
        sb.append(", fechaRecibida=").append(fechaRecibida);
        sb.append(", total=").append(total);
        sb.append('}');
        return sb.toString();
    }

}
