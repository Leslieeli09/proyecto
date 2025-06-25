package com.grupodetrabajo.backend.inventarioapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupodetrabajo.backend.inventarioapp.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}