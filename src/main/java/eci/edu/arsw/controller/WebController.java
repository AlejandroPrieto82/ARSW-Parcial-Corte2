package eci.edu.arsw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import eci.edu.arsw.service.WebService;

@RestController
public class WebController {
    @Autowired
    WebService service;
    
    @GetMapping("/sala")
    public String buscarSala(@RequestParam Long id){
        return "{\"sala\":\"" + id + "\"" +
            "\"status\":\""+ service.buscarSala(id).isPresent() +"\"}";
    }

    @PostMapping("/crear")
    public String crearSala(@RequestParam Long id){
        return "{\"sala\":\"" + id + "\"" +
            "\"status\":\""+ service.crearSala(id) +"\"}";
    }

    @DeleteMapping("/borrar")
    public String borrarSala(@RequestParam Long id){
        return "{\"sala\":\"" + id + "\"" +
            "\"status\":\""+ service.borrarSala(id) +"\"}";
    }
    
}
