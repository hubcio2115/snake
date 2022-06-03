import { LinkedListNode } from '../utils/classes';
import { DIRECTIONS } from '../utils/enums';
import { Coords } from '../utils/interfaces';

export function createBoard(boardSize: number): number[][] {
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
}

export function isOutOfBounds(coords: Coords, board: number[][]) {
  const { row, col } = coords;

  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;

  return false;
}

export function getDirectionFromKey(key: KeyboardEvent['key']) {
  switch (key) {
    case 'ArrowUp':
      return DIRECTIONS.UP;
    case 'ArrowDown':
      return DIRECTIONS.DOWN;
    case 'ArrowLeft':
      return DIRECTIONS.LEFT;
    case 'ArrowRight':
      return DIRECTIONS.RIGHT;
    default:
      return '';
  }
}

export function getOppositeDirection(direction: DIRECTIONS) {
  switch (direction) {
    case DIRECTIONS.UP:
      return DIRECTIONS.DOWN;
    case DIRECTIONS.DOWN:
      return DIRECTIONS.UP;
    case DIRECTIONS.LEFT:
      return DIRECTIONS.RIGHT;
    case DIRECTIONS.RIGHT:
      return DIRECTIONS.LEFT;
  }
}

export function getNextNodeDirection(
  node: LinkedListNode,
  currentDirection: DIRECTIONS,
) {
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
}

export function getCoordsInDirection(
  coords: Coords,
  direction: DIRECTIONS,
): Coords {
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
}

export function getGrowthNodeCoords(
  snakeTail: LinkedListNode,
  currentDirection: DIRECTIONS,
) {
  const tailNextNodeDirection = getNextNodeDirection(
    snakeTail,
    currentDirection,
  )!;
  const growthDirection = getOppositeDirection(tailNextNodeDirection);
  const currentTailCoords = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  };
  const growthNodeCoords = getCoordsInDirection(
    currentTailCoords,
    growthDirection,
  );
  return growthNodeCoords;
}
