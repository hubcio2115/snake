import { useState } from "react";
import "styles/Board.scss";

const BOARD_SIZE = 20;

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
