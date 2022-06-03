import { randomIntFromInterval } from '../src/utils/lib';

describe('returns random int from given interval', () => {
  it('returns an int between min = 10 and max = 100', () => {
    const int = randomIntFromInterval(10, 100);

    expect(int >= 10 && int <= 100).toBe(true);
  });

  it('returns an int between min = 4 and max = 5', () => {
    const int = randomIntFromInterval(4, 5);

    expect(int >= 4 && int <= 5).toBe(true);
  });

  it('returns an int between min = -100 and max = -10', () => {
    const int = randomIntFromInterval(-100, -10);

    expect(int >= -100 && int <= -10).toBe(true);
  });

  it('returns an int between min = 1 and max = 1', () => {
    const int = randomIntFromInterval(1, 1);

    expect(int === 1).toBe(true);
  });
});
