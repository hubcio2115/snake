import { getNextNodeDirection } from '../src/components/BoardUtils';
import { LinkedListNode } from '../src/utils/classes';
import { Cell } from '../src/utils/interfaces';
import { DIRECTIONS } from '../src/utils/enums';

describe('get direction of a next node', () => {
  it('returns the same direction, given null', () => {
    const cell: Cell = { row: 0, col: 0, cell: 0 };
    const node = new LinkedListNode(cell);

    const direction = getNextNodeDirection(node, DIRECTIONS.RIGHT);

    expect(direction).toBe('RIGHT');
  });

  it('returns "UP", given node that is linked to another one with node.row - 1 = node.next.row', () => {
    const cell: Cell = { row: 1, col: 0, cell: 21 };
    const node = new LinkedListNode(cell);

    const nextCell: Cell = { row: 0, col: 0, cell: 0 };
    const nextNode = new LinkedListNode(nextCell);

    node.next = nextNode;

    const direction = getNextNodeDirection(node, DIRECTIONS.RIGHT);

    expect(direction).toBe('UP');
  });

  it('returns "DOWN", given node that is linked to another one with node.row + 1 = node.next.row', () => {
    const cell: Cell = { row: 0, col: 0, cell: 0 };
    const node = new LinkedListNode(cell);

    const nextCell: Cell = { row: 1, col: 0, cell: 21 };
    const nextNode = new LinkedListNode(nextCell);

    node.next = nextNode;

    const direction = getNextNodeDirection(node, DIRECTIONS.RIGHT);

    expect(direction).toBe('DOWN');
  });

  it('returns "LEFT", given node that is linked to another one with node.col - 1 = node.next.col', () => {
    const cell: Cell = { row: 0, col: 1, cell: 1 };
    const node = new LinkedListNode(cell);

    const nextCell: Cell = { row: 0, col: 0, cell: 0 };
    const nextNode = new LinkedListNode(nextCell);

    node.next = nextNode;

    const direction = getNextNodeDirection(node, DIRECTIONS.RIGHT);

    expect(direction).toBe('LEFT');
  });

  it('returns "UP", given node that is linked to another one with node.col + 1 = node.next.row', () => {
    const cell: Cell = { row: 0, col: 0, cell: 0 };
    const node = new LinkedListNode(cell);

    const nextCell: Cell = { row: 0, col: 1, cell: 1 };
    const nextNode = new LinkedListNode(nextCell);

    node.next = nextNode;

    const direction = getNextNodeDirection(node, DIRECTIONS.RIGHT);

    expect(direction).toBe('RIGHT');
  });
});
