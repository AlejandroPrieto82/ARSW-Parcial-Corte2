package eci.edu.arsw.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import eci.edu.arsw.configuration.WSConfigurator;
import eci.edu.arsw.model.Room;
import eci.edu.arsw.repository.WebRepository;

@Service
public class WebService {

    @Autowired
    WebRepository repository;

    @Autowired
    WSConfigurator ws;

    public Optional<Room> buscarSala(Long  id){
        Optional<Room> room = repository.findById(id);
        return room;
    }

    public boolean crearSala(Long id){
        if(buscarSala(id).isPresent()){
            return false;
        }else{
            Room room = new Room();
            room.setId(id);
            room.setStatus(true);
            room.setWs(ws.serverEndpointExporter());
            repository.save(room);
            return true;
        }
    }

    public boolean borrarSala(Long id){
        Optional<Room> room = buscarSala(id);
        if(room.isPresent()){
            Room rom = room.get();
            repository.delete(rom);
            return true;
        }else{
            return false;
        }
    }

    public Optional<ServerEndpointExporter> conectarseSala(Long id){
        

    }
}
