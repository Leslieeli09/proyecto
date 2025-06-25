package com.grupodetrabajo.backend.inventarioapp.service;

import java.util.List;

import com.grupodetrabajo.backend.inventarioapp.model.Proveedor;

public interface ProveedorService {
    List<Proveedor> listarTodos();
    Proveedor guardar(Proveedor proveedor);
    void eliminar(Long id);
}