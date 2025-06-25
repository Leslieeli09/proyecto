package com.grupodetrabajo.backend.inventarioapp.dto;

import java.time.LocalDateTime;

public class SeccionDTO {
    private String titulo;
    private String descripcion;
    private String ruta;
    private String estado;
    private LocalDateTime ultimaActualizacion;

    public SeccionDTO(String titulo, String descripcion, String ruta, String estado, LocalDateTime ultimaActualizacion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.ruta = ruta;
        this.estado = estado;
        this.ultimaActualizacion = ultimaActualizacion;
    }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getRuta() { return ruta; }
    public void setRuta(String ruta) { this.ruta = ruta; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getUltimaActualizacion() { return ultimaActualizacion; }
    public void setUltimaActualizacion(LocalDateTime ultimaActualizacion) { this.ultimaActualizacion = ultimaActualizacion; }
}