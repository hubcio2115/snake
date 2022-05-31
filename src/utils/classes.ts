export interface Cell {
  row: number;
  col: number;
  value: number;
}

export class Cell {
  constructor(row: number, col: number, value: number) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
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
  constructor(value: Cell) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}
