import { useState } from "react";
import { LinkedListNode, SinglyLinkedList } from "utils/classes";
import "styles/Board.scss";

const BOARD_SIZE = 20;

const createBoard = (boardSize: number): number[][] => {
  let counter = 1;
  const board: number[][] = [];

  for (let row = 0; row < boardSize; row++) {
    const currentRow = [];
    for (let col = 0; col < boardSize; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }

  return board;
};

const Board = (): JSX.Element => {
  const [board, setBoard] = useState<number[][]>(
    new Array(BOARD_SIZE)
      .fill(0)
      .map((_row: number[]) => new Array(BOARD_SIZE).fill(0))
  );

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((_cell, cellIndex) => {
              return <div key={cellIndex} className="cell" />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
