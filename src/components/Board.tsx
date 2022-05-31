import {useEffect, useState} from 'react';
import {Cell, LinkedListNode, LinkedList} from 'utils/classes';
import {Coords} from 'utils/interfaces';
import {DIRECTIONS} from 'utils/enums';
import {
  randomIntFromInterval,
  createBoard,
  getDirectionFromKey,
  isOutOfBounds,
} from 'utils/lib';
import 'styles/Board.scss';

const BOARD_SIZE = 20;
const STARTING_SNAKE_CELL = 55;
const STARTING_FOOD_CELL = 48;
const STARTING_SNAKE_LL_VALUE: Cell = {
  row: 2,
  col: 14,
  cell: STARTING_SNAKE_CELL,
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

    window.addEventListener('keydown', (event) => {
      const newDirection = getDirectionFromKey(event.key);

      if (newDirection !== '') setDirection(newDirection);
    });
  }, []);

  const getNextSnakeHeadCoords = (
    currentSnakeHead: Coords,
    direction: DIRECTIONS,
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
    alert('Przegrałeś :(');
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
                      snakeCells.has(cellValue) ? ' snake-cell' : ''
                    } ${foodCell === cellValue ? ' apple-cell' : ''}`}
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
