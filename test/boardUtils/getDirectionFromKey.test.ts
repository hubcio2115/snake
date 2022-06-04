import { getDirectionFromKey } from '../../src/components/Game/GameUtils';

describe('returns correct direction after getting key from an keydown event', () => {
  it('returns "UP", given key = ArrowUp', () => {
    const direction = getDirectionFromKey('ArrowUp');

    expect(direction).toBe('UP');
  });

  it('returns "DOWN", given key = ArrowDown', () => {
    const direction = getDirectionFromKey('ArrowDown');

    expect(direction).toBe('DOWN');
  });

  it('returns "LEFT", given key = ArrowLeft', () => {
    const direction = getDirectionFromKey('ArrowLeft');

    expect(direction).toBe('LEFT');
  });

  it('returns "RIGHT", given key = ArrowRight ', () => {
    const direction = getDirectionFromKey('ArrowRight');

    expect(direction).toBe('RIGHT');
  });

  it('returns "", given a key that is not in DIRECTIONS enum', () => {
    const direction = getDirectionFromKey('A');

    expect(direction).toBe('');
  });
});
