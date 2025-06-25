package com.grupodetrabajo.backend.inventarioapp.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupodetrabajo.backend.inventarioapp.dto.SeccionDTO;

@RestController
@RequestMapping("/api/modulos")
public class ModuloReportesController {

    @GetMapping("/reportes")
    public Map<String, Object> obtenerSeccionesDeReportes() {
        Map<String, Object> respuesta = new HashMap<>();

        respuesta.put("modulo", "Reportes");
        respuesta.put("secciones", Arrays.asList(
            new SeccionDTO(
                "Inventario Actual",
                "Visualiza el estado actual del inventario.",
                "/inventario-actual.html",
                "activo",
                LocalDateTime.now()
            ),
            new SeccionDTO(
                "Reporte de Productos",
                "Consulta productos más vendidos o sin stock.",
                "/reporte-productos.html",
                "activo",
                LocalDateTime.now()
            )
        ));

        return respuesta;
    }
}