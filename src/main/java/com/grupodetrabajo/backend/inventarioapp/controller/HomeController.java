package com.grupodetrabajo.backend.inventarioapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String redirigirADashboard() {
        return "redirect:/dashboard.html";
    }
}