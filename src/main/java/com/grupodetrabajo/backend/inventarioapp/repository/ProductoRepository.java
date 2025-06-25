package com.grupodetrabajo.backend.inventarioapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.grupodetrabajo.backend.inventarioapp.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
@Query("SELECT SUM(p.existencias) FROM Producto p")
Integer totalStock();

@Query("SELECT SUM(p.existencias * p.precio) FROM Producto p")
Double valorTotalInventario();

}