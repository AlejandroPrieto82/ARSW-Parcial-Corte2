package eci.edu.arsw.repository;

import org.springframework.data.repository.CrudRepository;
import eci.edu.arsw.model.Room;


public interface  WebRepository extends CrudRepository<Room, Long>{
    
    Room findById(long id);
    Room findByStatus(boolean status);
    
}
