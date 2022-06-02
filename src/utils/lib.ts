import { DIRECTIONS } from './enums';
import { Coords } from './interfaces';

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createBoard = (boardSize: number): number[][] => {
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

export const isOutOfBounds = (coords: Coords, board: number[][]) => {
  const { row, col } = coords;

  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;

  return false;
};

export const getDirectionFromKey = (key: KeyboardEvent['key']) => {
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
};
