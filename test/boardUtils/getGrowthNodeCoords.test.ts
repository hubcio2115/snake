import { getGrowthNodeCoords } from '../../src/components/BoardUtils';
import { LinkedListNode } from '../../src/utils/classes';
import { DIRECTIONS } from '../../src/utils/enums';
import { Cell } from '../../src/utils/interfaces';

describe('get coords of a node that should be added to a linked list, on the opposite direction', () => {
  it('returns coords up of the tail', () => {
    const cell: Cell = { row: 1, col: 0, cell: 0 };
    const tail = new LinkedListNode(cell);

    const coords = getGrowthNodeCoords(tail, DIRECTIONS.DOWN);

    expect(coords).toEqual({ row: 0, col: 0 });
  });

  it('returns coords down of the tail', () => {
    const cell: Cell = { row: 0, col: 0, cell: 0 };
    const tail = new LinkedListNode(cell);

    const coords = getGrowthNodeCoords(tail, DIRECTIONS.UP);

    expect(coords).toEqual({ row: 1, col: 0 });
  });

  it('returns coords to the left of the tail', () => {
    const cell: Cell = { row: 0, col: 1, cell: 0 };
    const tail = new LinkedListNode(cell);

    const coords = getGrowthNodeCoords(tail, DIRECTIONS.RIGHT);

    expect(coords).toEqual({ row: 0, col: 0 });
  });

  it('returns coords to the right of the tail', () => {
    const cell: Cell = { row: 0, col: 0, cell: 0 };
    const tail = new LinkedListNode(cell);

    const coords = getGrowthNodeCoords(tail, DIRECTIONS.LEFT);

    expect(coords).toEqual({ row: 0, col: 1 });
  });
});
