export interface Cell {
  row: number;
  col: number;
  cell: number;
}

export interface LinkedListNode {
  value: Cell;
  next: LinkedListNode | null;
}

export class LinkedListNode {
  constructor(value: Cell) {
    this.value = value;
    this.next = null;
  }
}

export interface LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode | null;
}

export class LinkedList {
  constructor(cell: Cell) {
    const node = new LinkedListNode(cell);
    this.head = node;
    this.tail = node;
  }
}
