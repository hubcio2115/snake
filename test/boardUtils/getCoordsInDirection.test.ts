import { getCoordsInDirection } from '../../src/views/GameView/GameUtils';
import { DIRECTIONS } from '../../src/utils/enums';

describe('returns coords object from given coords in given direction', () => {
  it('returns { row: currentRow - 1, col: currentCol }, given direction = "UP"', () => {
    const coords = getCoordsInDirection({ row: 1, col: 0 }, DIRECTIONS.UP);

    expect(coords).toEqual({ row: 0, col: 0 });
  });

  it('returns { row: currentRow + 1, col: currentCol }, given direction = "DOWN"', () => {
    const coords = getCoordsInDirection({ row: 0, col: 0 }, DIRECTIONS.DOWN);

    expect(coords).toEqual({ row: 1, col: 0 });
  });

  it('returns { row: currentRow, col: currentCol + 1 }, given direction = "LEFT"', () => {
    const coords = getCoordsInDirection({ row: 0, col: 1 }, DIRECTIONS.LEFT);

    expect(coords).toEqual({ row: 0, col: 0 });
  });

  it('returns { row: currentRow, col: currentCol - 1 }, given direction = "RIGHT"', () => {
    const coords = getCoordsInDirection({ row: 0, col: 0 }, DIRECTIONS.RIGHT);

    expect(coords).toEqual({ row: 0, col: 1 });
  });
});
