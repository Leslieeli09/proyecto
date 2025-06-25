package com.grupodetrabajo.backend.inventarioapp.service;

import java.util.List;

import com.grupodetrabajo.backend.inventarioapp.model.Producto;

public interface ProductoService {
    List<Producto> listarTodos();
    Producto guardar(Producto producto);
    void eliminar(Long id);
}