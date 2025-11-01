# ARSW-Parcial-Corte2

## Estudiante: **ALejandro PRieto Reyes**



## FRONT
**Interfaz:** Hice una interfaz en react medianamente funcional, donde se podia salir, entrar a jugar en solitario y se podria entrar a jugar en multijugador.
- Crear Sala: El usuario ponia el codigo de la sala para crearse, despues de creado lo enviaba a la sala a esperar al otro jugador
- Conectarse a Sala: El usuario pone el codigo de la sala que se quiere conectar, para poder jugar con su amigo (Primero valida si la sala existe, luego lo envia a la sala de juego)
- Jugar: Para jugar uno en su propia maquina
- Salir: Para salir de la pagina


## Back
**Back:** Trate de hacer una aplicacion con JPA para guardar las salas, la finalidad es guardar los ID y los status de cada una, esto para no replicar salas con el mismo ID, y porque queria poner la opcion de buscar por status, para cuando uno quisiera buscar una sala, poder encontrar las salas abiertas y si queria conectarse. La gracia era que esa sala con el id creado, conectara con la otra para poder jugar desde multiples lugares
- Service: 


## Porque no funciona
- No alcance a implementar el back con la conexion WS completamente
- Funciona en local (Conectandose al id de la sala de la misma maquina), o en despliegue funcionaria (Con la logica que tengo)
