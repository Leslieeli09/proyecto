package com.grupodetrabajo.backend.inventarioapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupodetrabajo.backend.inventarioapp.dto.DashboardDTO;
import com.grupodetrabajo.backend.inventarioapp.repository.ProductoRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public DashboardDTO obtenerDatosDashboard() {
        DashboardDTO dto = new DashboardDTO();
        dto.setTotalProductos(productoRepository.count());
        dto.setTotalStock(productoRepository.totalStock() != null ? productoRepository.totalStock() : 0);
        dto.setValorTotalInventario(productoRepository.valorTotalInventario() != null ? productoRepository.valorTotalInventario() : 0.0);
        return dto;
    }
}