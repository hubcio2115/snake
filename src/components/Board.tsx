import { useEffect, useState } from "react";
import { Cell, LinkedListNode, LinkedList } from "utils/classes";
import { Coords } from "utils/interfaces";
import "styles/Board.scss";
import { randomIntFromInterval } from "utils/lib";

const BOARD_SIZE = 20;
const STARTING_SNAKE_CELL = 55;
const STARTING_FOOD_CELL = 48;
const STARTING_SNAKE_LL_VALUE: Cell = {
  row: 2,
  col: 14,
  cell: STARTING_SNAKE_CELL,
};

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

const isOutOfBounds = (coords: Coords, board: number[][]) => {
  const { row, col } = coords;

  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;

  return false;
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
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState<number[][]>(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([STARTING_SNAKE_CELL]));
  const [foodCell, setFoodCell] = useState(STARTING_FOOD_CELL);
  const [snake, setSnake] = useState(new LinkedList(STARTING_SNAKE_LL_VALUE));
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

  const handleFoodConsumption = () => {
    const allPossibleCellValues = BOARD_SIZE ** 2;

    let nextFoodCell: number;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, allPossibleCellValues);
      if (snakeCells.has(nextFoodCell) || foodCell === nextFoodCell) continue;
      break;
    }

    setFoodCell(nextFoodCell);
    setScore(score + 1);
  };

  const handleGameOver = () => {
    setScore(0);
    setFoodCell(STARTING_FOOD_CELL);
    setSnakeCells(new Set([STARTING_SNAKE_CELL]));
    setSnake(new LinkedList(STARTING_SNAKE_LL_VALUE));
    alert("Przegrałeś :(");
  };

  const moveSnake = () => {
    const currentHeadCoords: Coords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getNextSnakeHeadCoords(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleGameOver();
      return;
    }

    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver();
      return;
    }

    if (nextHeadCell === foodCell) handleFoodConsumption();

    const newHead = new LinkedListNode({
      ...nextHeadCoords,
      cell: nextHeadCell,
    });

    const newSnakeCells = new Set(snakeCells);
    if (snake.tail) newSnakeCells.delete(snake.tail.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.head = newHead;
    snake.tail = snake.tail!.next;
    if (snake.tail === null) snake.tail = snake.head;

    setSnakeCells(newSnakeCells);
  };

  return (
    <>
      <h2>Score: {score}</h2>
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
                    } ${foodCell === cellValue ? " apple-cell" : ""}`}
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
