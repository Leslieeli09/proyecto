package com.grupodetrabajo.backend.inventarioapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupodetrabajo.backend.inventarioapp.model.Producto;
import com.grupodetrabajo.backend.inventarioapp.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // OBTINENE TODOS LOS PRODUCTO
    @GetMapping
    public List<Producto> listar() {
        return productoService.listarTodos();
    }

    // GUARDA
    @PostMapping
    public Producto guardar(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }
@PutMapping("/{id}")
public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto producto) {
    producto.setId(id);
    Producto actualizado = productoService.guardar(producto);
    return ResponseEntity.ok(actualizado);
}

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}