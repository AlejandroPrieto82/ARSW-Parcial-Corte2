package eci.edu.arsw.model;

import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Room {
    private long id;
    private boolean status;
    private ServerEndpointExporter ws;

    public void setId(long id){
        this.id = id;
    }

    public long getId(){
        return id;
    }

    public void setStatus(boolean status){
        this.status = status;
    }

    public boolean getStatus(){
        return status;
    }

    public void setWs(ServerEndpointExporter ws){
        this.ws = ws;
    }

    public ServerEndpointExporter getWs(){
        return ws;
    }


}
