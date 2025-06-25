package com.grupodetrabajo.backend.inventarioapp.service;

import java.util.List;

import com.grupodetrabajo.backend.inventarioapp.model.Categoria;

public interface CategoriaService {
    List<Categoria> listarTodas();
    Categoria guardar(Categoria categoria);
    void eliminar(Long id);
}