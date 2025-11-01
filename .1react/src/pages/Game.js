import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

/*
  Componente Square
  -----------------
  Propósito:
    - Componente funcional que representa una casilla del tablero (un botón).
    - Es un componente "presentacional": no mantiene estado propio, sólo recibe props.

  Props:
    - value: puede ser null, 'X' o 'O'. Se renderiza dentro del botón.
    - onSquareClick: función callback que se ejecuta cuando el usuario hace click
      en la casilla. La lógica de la jugada se maneja en el componente padre (Board).

  Observaciones:
    - Al separar Square como componente, mejoramos la legibilidad y reusabilidad.
    - Square no conoce la lógica del juego; sólo encapsula la UI de la casilla.
*/
function Square({ value, onSquareClick }) {
  return (
    // botón que muestra el valor de la casilla y delega el evento click al padre
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/*
  Componente Board
  ----------------
  Propósito:
    - Representa el tablero de 3x3.
    - Recibe el estado actual del tablero (squares), quién sigue (xIsNext)
      y un callback onPlay para notificar al componente padre cuando hay una jugada.
    - Contiene la lógica para manejar un click en una casilla, crear el nuevo
      estado inmutable y evitar acciones inválidas (p. ej. jugar en casilla ocupada
      o después de tener un ganador).

  Props:
    - xIsNext: boolean. true si el siguiente en jugar es 'X', false si es 'O'.
    - squares: array de 9 elementos; cada índice representa una casilla del tablero.
    - onPlay: función que recibe nextSquares (nuevo array) y actualiza el historial
      en el componente Game (el padre).
*/
function Board({ xIsNext, squares, onPlay }) {
  // handleClick: función que maneja el click en la casilla `i`.
  // - Valida si la jugada es permitida.
  // - Crea una copia del array `squares` (inmutabilidad).
  // - Asigna 'X' o 'O' en la posición correspondiente.
  // - Llama a onPlay con el nuevo array.
  function handleClick(i) {
    // Si ya hay un ganador, no permitir más jugadas.
    // calculateWinner(squares) devuelve 'X' o 'O' si hay ganador, o null si no.
    if (calculateWinner(squares) || squares[i]) {
      // squares[i] truthy => casilla ocupada; abortar.
      return;
    }

    // COPIA del array de squares:
    // - usamos slice() para no mutar el array que nos pasaron por props.
    // - la inmutabilidad facilita implementar el historial (time travel) y debugging.
    const nextSquares = squares.slice();

    // Asignación según xIsNext
    // - Si xIsNext es true, la jugada actual es de 'X', si no, de 'O'.
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Llamamos al callback onPlay que el componente Game pasó por props.
    // onPlay se encarga de actualizar el historial y el movimiento actual.
    onPlay(nextSquares);
  }

  // Calculamos el posible ganador con la función pura calculateWinner.
  // - Guardamos el resultado en `winner`. Si hay ganador, winner será 'X' o 'O'.
  const winner = calculateWinner(squares);

  // Construimos la cadena `status` que se muestra arriba del tablero.
  // - Si hay ganador mostramos "Winner: X" o "Winner: O".
  // - Si no, mostramos a quién le toca jugar ("Next player: X" o "...: O").
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render:
  // - Mostramos el estado (status).
  // - Tres filas (`board-row`) con tres Squares cada una.
  // - Cada Square recibe su valor y un onSquareClick que llama a handleClick(i).
  // - Nota sobre performance: para tableros pequeños no es un problema; para apps
  //   mayores convendría memorizar callbacks o usar useCallback si fueran necesarios.
  return (
    <>
      <div className="status">{status}</div>

      {/* fila 1: índices 0,1,2 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      {/* fila 2: índices 3,4,5 */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      {/* fila 3: índices 6,7,8 */}
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/*
  Componente Game (export default)
  -------------------------------
  Propósito:
    - Componente de más alto nivel que maneja el historial de jugadas (time travel).
    - Mantiene dos piezas de estado:
      1) history: array de estados del tablero (cada estado es un array de 9 elementos).
      2) currentMove: índice en `history` que indica qué movimiento se está viendo.
    - Calcula xIsNext con base en currentMove (par => X, impar => O).
    - Pasa al Board sólo el estado actual del tablero y callbacks para actualizar el historial.
    - Renderiza una lista ordenada de botones que permiten ir a movimientos anteriores (jumpTo).

  Estado / variables:
    - history (Array<Array|null>): historial inmutable de estados del tablero.
      Ejemplo inicial: [ [null, null, ..., null] ] (un único estado con 9 nulls).
    - currentMove (number): índice del movimiento actual dentro de history.
    - xIsNext (boolean): quien tiene el próximo turno (determinado por currentMove).
    - currentSquares: el estado del tablero correspondiente a history[currentMove].
*/
export default function Game() {
  // Inicialización del historial: un estado inicial con 9 casillas vacías.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Movimiento actual (índice en el array `history`).
  const [currentMove, setCurrentMove] = useState(0);

  // Si currentMove es par => es el turno de X; si es impar => turno de O.
  // Esto se deduce porque el movimiento 0 es el tablero vacío (X inicia).
  const xIsNext = currentMove % 2 === 0;

  // Estado del tablero para el movimiento actual.
  const currentSquares = history[currentMove];

  /*
    handlePlay(nextSquares)
    -----------------------
    - Se llama cuando Board reporta una nueva jugada (onPlay).
    - Debe:
      1) Cortar el historial hasta currentMove + 1 para eliminar cualquier ramificación
         (esto ocurre si el usuario viajó en el tiempo y luego hizo una jugada).
      2) Añadir nextSquares al final del historial resultante.
      3) Actualizar el estado history y situar currentMove en el último índice.

    Ejemplo:
      history = [S0, S1, S2], currentMove = 1 (estamos viendo S1).
      Si hacemos una nueva jugada, nextHistory = [S0, S1, nextSquares].
      setCurrentMove(nextHistory.length - 1) -> apunta a la nueva jugada.
  */
  function handlePlay(nextSquares) {
    // history.slice(0, currentMove + 1) deja sólo los movimientos hasta el actual.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // El nuevo movimiento actual es el último en nextHistory.
    setCurrentMove(nextHistory.length - 1);
  }

  /*
    jumpTo(nextMove)
    ----------------
    - Cambia currentMove para "viajar en el tiempo" a un estado anterior.
    - No modifica el historial; sólo cambia qué índice del historial se muestra.
    - Ejemplo: jumpTo(0) vuelve al inicio; jumpTo(2) muestra el tercer movimiento.
  */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /*
    moves: array de elementos <li> con botones que permiten navegar por el historial.
    - history.map((squares, move) => { ... })
      - `move` es el índice (0..n).
      - description es la cadena que se muestra en el botón.
      - Cada <li> usa key={move} para ayudar a React a identificar elementos.
    Observaciones:
      - Se podría mejorar mostrando información adicional (p. ej. coordenadas de la jugada
        o un timestamp) si guardamos esa información en el historial.
  */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move; // p. ej. "Go to move #2"
    } else {
      description = 'Go to game start'; // el movimiento 0
    }
    return (
      <li key={move}>
        {/* Al hacer click llamamos a jumpTo(move) para ver ese movimiento */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render principal del componente Game:
  // - Contenedor principal con la sección del tablero y la sección de info (historial).
  // - Board recibe props: xIsNext (quién juega), squares (estado actual), onPlay (callback).
  // - A la derecha (o debajo según CSS) se muestra la lista ordenada de movimientos (moves).
  const nav = useNavigate()
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div>
        <button
         className="menuButton"
         onClick={() => nav('/menu')}
        >
          Menu
        </button>
      </div>
    </div>
  );
}

/*
  calculateWinner
  ----------------
  Propósito:
    - Función pura que determina si existe un ganador en el array `squares`.
    - No tiene efectos secundarios y no modifica `squares`.

  Implementación:
    - Definimos `lines`, las 8 combinaciones posibles de 3 en línea en un tablero 3x3:
      - 3 filas, 3 columnas y 2 diagonales.
    - Iteramos sobre `lines`. Para cada [a,b,c], comprobamos si:
      - squares[a] no es null (hay una ficha) y
      - squares[a] === squares[b] === squares[c]
      Si se cumple, devolvemos el valor ganador ('X' o 'O').

  Resultado:
    - Devuelve 'X' o 'O' si hay ganador.
    - Devuelve null si no hay ganador (aún) o si hay empate sin línea ganadora.
    - Nota: Esta función no detecta explícitamente un empate; devuelve null también
      cuando el tablero está completo sin ganador. El chequeo de empate podría
      añadirse como `squares.every(Boolean)` en otro lugar si se desea mostrar "Draw".
*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // fila superior
    [3, 4, 5], // fila central
    [6, 7, 8], // fila inferior
    [0, 3, 6], // columna izquierda
    [1, 4, 7], // columna central
    [2, 5, 8], // columna derecha
    [0, 4, 8], // diagonal principal (de arriba-izquierda a abajo-derecha)
    [2, 4, 6], // diagonal secundaria (de arriba-derecha a abajo-izquierda)
  ];

  // Recorremos las combinaciones ganadoras posibles.
  for (let i = 0; i < lines.length; i++) {
    // Desestructuramos los índices de la línea actual.
    const [a, b, c] = lines[i];

    // Comprobamos que la posición `a` no sea null (hay ficha) y que las tres sean iguales.
    // Esto evita declarar ganador cuando hay tres nulls en una línea.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Retornamos 'X' o 'O' inmediatamente al encontrar la primera línea ganadora.
      return squares[a];
    }
  }

  // Si no se encontró ninguna combinación ganadora, devolvemos null.
  return null;
}
