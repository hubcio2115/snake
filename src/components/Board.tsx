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
  const [board, setBoard] = useState<number[][]>(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([34]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((cellValue, cellIndex) => {
              return (
                <div
                  key={cellIndex}
                  className={`cell${
                    snakeCells.has(cellValue) ? " snake-cell" : ""
                  }`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;