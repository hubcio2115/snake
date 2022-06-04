import { useEffect, useMemo, useRef, useState } from 'react';
import { LinkedListNode, LinkedList } from 'utils/classes';
import { Coords, Cell } from 'utils/interfaces';
import { DIRECTIONS } from 'utils/enums';
import { randomIntFromInterval } from 'utils/lib';
import {
  createBoard,
  getDirectionFromKey,
  isOutOfBounds,
  getOppositeDirection,
  getGrowthNodeCoords,
  getCoordsInDirection,
} from './BoardUtils';
import 'styles/Board.scss';
import { useInterval } from 'utils/hooks';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const [lost, setLost] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(
    new LinkedList(getStartingSnakeLLValue(board)),
  );
  const [snakeCells, _setSnakeCells] = useState(
    new Set([snake.head.value.cell]),
  );
  const snakeCellsHookRef = useRef(snakeCells);
  const setSnakeCells = (newSnakeCells: Set<number>) => {
    snakeCellsHookRef.current = newSnakeCells;
    _setSnakeCells(newSnakeCells);
  };

  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 5);
  const [mineCells, setMineCells] = useState(new Set<number>([]));

  const [direction, _setDirection] = useState(DIRECTIONS.RIGHT);
  const directionHookRef = useRef(direction);
  const setDirection = (direction: DIRECTIONS) => {
    directionHookRef.current = direction;
    _setDirection(direction);
  };

  const [snakesSpeed, setSnakesSpeed] = useState(300);
  const [foodLocationDelay, setFoodLocationDelay] = useState(10000);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      handleKeydown(event.key);
    });
  }, []);

  useEffect(() => {
    if (lost) setSnake(new LinkedList({ row: -1, col: -1, cell: -1 }));
  }, [lost]);

  useInterval(() => {
    moveSnake();
  }, snakesSpeed);

  useInterval(() => {
    spawnFoodInNewLocation(snakeCells);
  }, foodLocationDelay);

  useInterval(() => {
    spawnMine();
  }, 30000);

  const handleKeydown = (key: KeyboardEvent['key']) => {
    const newDirection = getDirectionFromKey(key);
    const isValidDirection = newDirection !== '';

    if (!isValidDirection) return;

    const snakeWillRunIntoItself =
      getOppositeDirection(newDirection) === directionHookRef.current &&
      snakeCellsHookRef.current.size > 1;

    if (snakeWillRunIntoItself) return;
    setDirection(newDirection);
  };

  const spawnFoodInNewLocation = (snakeCells: Set<number>) => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;

    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (
        snakeCells.has(nextFoodCell) ||
        mineCells.has(nextFoodCell) ||
        foodCell === nextFoodCell
      )
        continue;
      break;
    }

    foodLocationDelay === 10000
      ? setFoodLocationDelay(foodLocationDelay - 1)
      : setFoodLocationDelay(foodLocationDelay + 1);

    setFoodCell(nextFoodCell);
  };

  const spawnMine = () => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;

    let newMineCell;
    while (true) {
      newMineCell = randomIntFromInterval(1, maxPossibleCellValue);

      if (
        snakeCells.has(newMineCell) ||
        mineCells.has(newMineCell) ||
        foodCell === newMineCell
      )
        continue;
      break;
    }

    const newMineCells = new Set(mineCells);
    newMineCells.add(newMineCell);
    setMineCells(newMineCells);
  };

  const handleFoodConsumption = (newSnakeCells: Set<number>) => {
    spawnFoodInNewLocation(newSnakeCells);

    if ((score + 1) % 5 === 0) setSnakesSpeed(snakesSpeed * 0.75);
    setScore(score + 1);
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

  const handleStartGameOver = () => {
    setLost(false);
    setScore(0);

    const snakeLLStartingValue = getStartingSnakeLLValue(board);
    setSnake(new LinkedList(snakeLLStartingValue));

    setFoodCell(snakeLLStartingValue.cell + 5);
    setMineCells(new Set());
    setSnakeCells(new Set([snakeLLStartingValue.cell]));

    setDirection(DIRECTIONS.RIGHT);
    setSnakesSpeed(300);
  };

  const handleGameOver = () => {
    setLost(true);
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
    if (snakeCells.has(nextHeadCell) || mineCells.has(nextHeadCell)) {
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
      growSnake(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

  return (
    <Stack className="board-container">
      <Modal open={lost} onClose={() => {}}>
        <Box className="modal-box">
          <Typography variant="h3">Przegrałeś 🙁</Typography>
          <Typography variant="h6" className="modal-score">
            Twój wynik to: {score}
          </Typography>
          <Box className="button-container">
            <Button
              variant="contained"
              color="success"
              onClick={handleStartGameOver}
            >
              Graj Jeszcze Raz!
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate('/')}
            >
              Powrót do menu
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box className="board">
        {board.map((row, rowIndex) => {
          return (
            <Box key={rowIndex} className="row">
              {row.map((cellValue, cellIndex) => {
                return (
                  <Box
                    key={cellIndex}
                    className="cell"
                    style={{
                      backgroundColor: snakeCells.has(cellValue) ? 'green' : '',
                    }}
                  >
                    {foodCell === cellValue ? '🍎' : ''}
                    {mineCells.has(cellValue) ? '💣' : ''}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Typography variant="h4">Score: {score}</Typography>
    </Stack>
  );
};

export default Board;
