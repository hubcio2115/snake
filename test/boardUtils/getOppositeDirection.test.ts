import { getOppositeDirection } from '../../src/components/BoardUtils';
import { DIRECTIONS } from '../../src/utils/enums';

describe('returns opposite of the given direction', () => {
  it('returns "DOWN", given "UP"', () => {
    const direction = getOppositeDirection(DIRECTIONS.UP);

    expect(direction).toBe('DOWN');
  });

  it('returns "UP", given "DOWN"', () => {
    const direction = getOppositeDirection(DIRECTIONS.DOWN);

    expect(direction).toBe('UP');
  });

  it('returns "RIGHT", given "LEFT"', () => {
    const direction = getOppositeDirection(DIRECTIONS.LEFT);

    expect(direction).toBe('RIGHT');
  });

  it('returns "LEFT", given "RIGHT"', () => {
    const direction = getOppositeDirection(DIRECTIONS.RIGHT);

    expect(direction).toBe('LEFT');
  });
});
