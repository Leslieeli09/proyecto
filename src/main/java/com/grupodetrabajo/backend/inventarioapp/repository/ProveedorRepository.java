package com.grupodetrabajo.backend.inventarioapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupodetrabajo.backend.inventarioapp.model.Proveedor;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
}