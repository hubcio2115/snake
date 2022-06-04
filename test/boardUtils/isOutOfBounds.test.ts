import { isOutOfBounds } from '../../src/views/GameView/GameUtils';

describe('checks if given coords are within board', () => {
  it('for board with boardSize = 5 returns true for coords row = 6 and col = 0', () => {
    const board = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];

    const coords = {
      row: 6,
      col: 0,
    };

    expect(isOutOfBounds(coords, board)).toBe(true);
  });
  it('for board with boardSize = 5 returns false for coords row = 1 and col = 1', () => {
    const board = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];

    const coords = {
      row: 0,
      col: 0,
    };

    expect(isOutOfBounds(coords, board)).toBe(false);
  });
  it('for board with boardSize = 5 returns false for coords row = 0 and col = -1', () => {
    const board = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];

    const coords = {
      row: 0,
      col: -1,
    };

    expect(isOutOfBounds(coords, board)).toBe(true);
  });
});
