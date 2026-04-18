package com.servias.shop.model;

public class Usuario {

    private Integer id;
    private String nombre;
    private String username;
    private String email;
    private String direccion;
    private String telefono;
    private String tipo;
    private String password;

    public Usuario() {
    }

    public Usuario(String direccion, String email, Integer id, String nombre, String password, String telefono, String tipo, String username) {
        this.direccion = direccion;
        this.email = email;
        this.id = id;
        this.nombre = nombre;
        this.password = password;
        this.telefono = telefono;
        this.tipo = tipo;
        this.username = username;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("usuario{");
        sb.append("id=").append(id);
        sb.append(", nombre=").append(nombre);
        sb.append(", username=").append(username);
        sb.append(", email=").append(email);
        sb.append(", direccion=").append(direccion);
        sb.append(", telefono=").append(telefono);
        sb.append(", tipo=").append(tipo);
        sb.append(", password=").append(password);
        sb.append('}');
        return sb.toString();
    }

}
