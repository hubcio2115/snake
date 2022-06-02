import { useEffect, useMemo, useRef, useState } from 'react';
import { Cell, LinkedListNode, LinkedList } from 'utils/classes';
import { Coords } from 'utils/interfaces';
import { DIRECTIONS } from 'utils/enums';
import {
  randomIntFromInterval,
  createBoard,
  getDirectionFromKey,
  isOutOfBounds,
} from 'utils/lib';
import 'styles/Board.scss';

const BOARD_SIZE = 20;

const getStartingSnakeLLValue = (board: number[][]): Cell => {
  const rowSize = board.length;
  const colSize = board[0].length;

  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];

  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

const Board = (): JSX.Element => {
  const board = useMemo(() => createBoard(BOARD_SIZE), []);

  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board)),
  );
  const [snakeCells, setSnakeCells] = useState(
    new Set([snake.head.value.cell]),
  );

  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);

  const [direction, _setDirection] = useState(DIRECTIONS.RIGHT);
  const directionHookRef = useRef(direction);
  const setDirection = (direction: DIRECTIONS) => {
    directionHookRef.current = direction;
    _setDirection(direction);
  };

  useEffect(() => {
    //   setInterval(() => {
    //     moveSnake();
    //   }, 1000);

    window.addEventListener('keydown', (event) => {
      const newDirection = getDirectionFromKey(event.key);

      if (newDirection !== '') setDirection(newDirection);
    });
  }, []);

  const handleFoodConsumption = (newSnakeCells: Set<number>) => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;

    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
        continue;
      break;
    }

    setFoodCell(nextFoodCell);
    setScore(score + 1);
  };

  const getOppositeDirection = (direction: DIRECTIONS) => {
    if (direction === DIRECTIONS.UP) return DIRECTIONS.DOWN;
    if (direction === DIRECTIONS.RIGHT) return DIRECTIONS.LEFT;
    if (direction === DIRECTIONS.DOWN) return DIRECTIONS.UP;
    if (direction === DIRECTIONS.LEFT) return DIRECTIONS.RIGHT;
  };

  const getGrowthNodeCoords = (
    snakeTail: LinkedListNode,
    currentDirection: DIRECTIONS,
  ) => {
    const tailNextNodeDirection = getNextNodeDirection(
      snakeTail,
      currentDirection,
    )!;
    const growthDirection = getOppositeDirection(tailNextNodeDirection)!;
    const currentTailCoords = {
      row: snakeTail.value.row,
      col: snakeTail.value.col,
    };
    const growthNodeCoords = getCoordsInDirection(
      currentTailCoords,
      growthDirection,
    );
    return growthNodeCoords;
  };

  const growSnake = (newSnakeCells: Set<number>) => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail!, direction);

    if (isOutOfBounds(growthNodeCoords, board)) return;

    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });

    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;

    newSnakeCells.add(newTailCell);
  };

  const getCoordsInDirection = (
    coords: Coords,
    direction: DIRECTIONS,
  ): Coords => {
    switch (direction) {
      case DIRECTIONS.UP:
        return {
          row: coords.row - 1,
          col: coords.col,
        };
      case DIRECTIONS.RIGHT:
        return {
          row: coords.row,
          col: coords.col + 1,
        };
      case DIRECTIONS.DOWN:
        return {
          row: coords.row + 1,
          col: coords.col,
        };
      case DIRECTIONS.LEFT:
        return {
          row: coords.row,
          col: coords.col - 1,
        };
    }
  };

  const getNextNodeDirection = (
    node: LinkedListNode,
    currentDirection: DIRECTIONS,
  ) => {
    if (node.next === null) return currentDirection;
    const { row: currentRow, col: currentCol } = node.value;
    const { row: nextRow, col: nextCol } = node.next.value;

    if (nextRow === currentRow && nextCol === currentCol + 1)
      return DIRECTIONS.RIGHT;
    if (nextRow === currentRow && nextCol === currentCol - 1)
      return DIRECTIONS.LEFT;
    if (nextCol === currentCol && nextRow === currentRow + 1)
      return DIRECTIONS.DOWN;
    if (nextCol === currentCol && nextRow === currentRow - 1)
      return DIRECTIONS.UP;
  };

  const handleGameOver = () => {
    setScore(0);

    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));
    setFoodCell(snakeLLStartingValue.cell + 5);

    setSnakeCells(new Set([snakeLLStartingValue.cell]));
    setDirection(DIRECTIONS.RIGHT);

    alert('Przegrałeś :(');
  };

  const moveSnake = () => {
    const currentHeadCoords: Coords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleGameOver();
      return;
    }

    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver();
      return;
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail!.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.tail = snake.tail!.next;
    if (snake.tail === null) snake.tail = snake.head;

    const foodConsumed = nextHeadCell === foodCell;
    if (foodConsumed) {
      // This function mutates newSnakeCells.
      growSnake(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
    }

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
