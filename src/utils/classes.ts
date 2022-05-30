export interface LinkedListNode {
  value: number;
  next: number | null;
}

export class LinkedListNode {
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export interface SinglyLinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;
}

export class SinglyLinkedList {
  constructor(value: number) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}
