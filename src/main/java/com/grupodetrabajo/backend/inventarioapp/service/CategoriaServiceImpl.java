package com.grupodetrabajo.backend.inventarioapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupodetrabajo.backend.inventarioapp.model.Categoria;
import com.grupodetrabajo.backend.inventarioapp.repository.CategoriaRepository;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository repo;

    @Override
    public List<Categoria> listarTodas() {
        return repo.findAll();
    }

    @Override
    public Categoria guardar(Categoria categoria) {
        return repo.save(categoria);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}