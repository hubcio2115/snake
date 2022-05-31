import { useEffect, useState } from "react";
import { Cell, LinkedListNode, LinkedList } from "utils/classes";
import { Coords } from "utils/interfaces";
import "styles/Board.scss";

const BOARD_SIZE = 10;

enum DIRECTIONS {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

const createBoard = (boardSize: number): number[][] => {
  let counter = 1;
  const board: number[][] = [];

  for (let row = 0; row < boardSize; row++) {
    const currentRow = [];
    for (let col = 0; col < boardSize; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }

  return board;
};

const getDirectionFromKey = (key: KeyboardEvent["key"]) => {
  switch (key) {
    case "ArrowUp":
      return DIRECTIONS.UP;
    case "ArrowDown":
      return DIRECTIONS.DOWN;
    case "ArrowLeft":
      return DIRECTIONS.LEFT;
    case "ArrowRight":
      return DIRECTIONS.RIGHT;
    default:
      return "";
  }
};

const Board = (): JSX.Element => {
  const [board, setBoard] = useState<number[][]>(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new LinkedList(new Cell(4, 3, 44)));
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);

  useEffect(() => {
    //   setInterval(() => {
    //     moveSnake();
    //   }, 1000);

    window.addEventListener("keydown", (event) => {
      const newDirection = getDirectionFromKey(event.key);

      if (newDirection !== "") setDirection(newDirection);
    });
  }, []);

  const getNextSnakeHeadCoords = (
    currentSnakeHead: Coords,
    direction: DIRECTIONS
  ) => {
    switch (direction) {
      case DIRECTIONS.UP:
        return {
          row: currentSnakeHead.row - 1,
          col: currentSnakeHead.col,
        };
      case DIRECTIONS.DOWN:
        return {
          row: currentSnakeHead.row + 1,
          col: currentSnakeHead.col,
        };
      case DIRECTIONS.LEFT:
        return {
          row: currentSnakeHead.row,
          col: currentSnakeHead.col - 1,
        };
      case DIRECTIONS.RIGHT:
        return {
          row: currentSnakeHead.row,
          col: currentSnakeHead.col + 1,
        };
    }
  };

  const moveSnake = () => {
    const currentHeadCoords: Coords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const newHeadCoords = getNextSnakeHeadCoords(currentHeadCoords, direction);
    const newHeadValue = board[newHeadCoords.row][newHeadCoords.col];
    const newHead = new LinkedListNode(
      new Cell(newHeadCoords.row, newHeadCoords.col, newHeadValue)
    );

    const newSnakeCells = new Set(snakeCells);
    if (snake.tail) newSnakeCells.delete(snake.tail.value.value);
    newSnakeCells.add(newHeadValue);

    snake.head = newHead;
    snake.tail = snake.tail!.next;
    if (snake.tail === null) snake.tail = snake.head;

    setSnakeCells(newSnakeCells);
  };

  return (
    <>
      <button onClick={() => moveSnake()}>Move manually</button>
      <div className="board">
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((cellValue, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className={`cell${
                      snakeCells.has(cellValue) ? " snake-cell" : ""
                    }`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
