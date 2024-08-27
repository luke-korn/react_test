import {useState} from "react";
import { new_board } from "./empty_board";

const Board = ({ board, setBoard, setPlaying }) => {
  const [winner, setwinner] = useState(false)
  const Tile = ({ x, y }) => {
    const val = board[x][y]
    return (
      <div
        onClick={() => {
          handleClick(x, y);
        }}
        className="t1"
      >
        {val !== 0? board[x][y] : ''}
      </div>
    );
  };
  const Row = ({ r }) => {
    const a = [];
    for (let i = 0; i < board.length; i++) {
      a.push(<Tile x={r} y={i} />);
    }
    return <div className="row">{a}</div>;
  };
  const getRows = (numRow) => {
    const a = [];
    for (let i = 0; i < numRow; i++) {
      a.push(<Row className="row" r={i} />);
    }
    return a;
  };
  function findEmty(x, y) {
    console.log(board[0][0] === 0);
    const pos = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    let a, b;
    let f = false;
    pos.forEach((e) => {
      const i = e[0];
      const j = e[1];

      if (i >= 0 && i < board.length && j >= 0 && j < board.length) {
        if (board[i][j] === 0) {
          console.log("found it");
          a = i;
          b = j;
          f = true;
        }
      }
    });
    if (f) {
      console.log(a, b);
      return { i: a, j: b };
    }
    return false;
  }
  function check_winner(br) {
    const flat = br.flat()
    for (let i = 0; i < flat.length - 1; i++) {
      if (flat[i] != i + 1) {
        return false 
      }
    }
    setwinner(true)
  
    return true
  }
  function zero() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          return {i, j} 
        }
      }
    }
  }

  function handleClick(x, y) {
    if (board[x][y] === 0){ //|| !findEmty(x, y)) {
      return;
    }
    // const { i, j } = findEmty(x, y);
    const { i, j } = zero();
    const newBoard = [...board];
    if (x === i) {
      const row = newBoard[i]
      if (y > j) {
        console.log(row[j])
        for (let ind = j; ind < y; ind++) {
          row[ind] = row[ind + 1]
        }
        row[y] = 0
      } else{
        for (let ind = j; ind > y; ind--) {
          row[ind] = row[ind - 1]
        }
        row[y] = 0
      }
      newBoard[i] = row
    } else if (y === j) {
      if (x > i) {
        for (let ind = i; ind < x; ind++) {
          newBoard[ind][y] = newBoard[ind + 1][y]
        }
        newBoard[x][y] = 0
      }else {
        for (let ind = i; ind > x; ind--) {
          newBoard[ind][y] = newBoard[ind - 1][y]
        }
        newBoard[x][y] = 0

      } 
    } 
    check_winner(newBoard)
    setBoard(newBoard);
  }
  function Winner() {
    return (
      <div className='winner'>
        You won!!!
        <button onClick={()=>{
          // setBoard(new_board(size))
          setPlaying(false)
          setwinner(false)
        }}>More?</button>
       
      </div>
    )
    
  }

  return (
    <div className='board'>
      {winner? <Winner/> : getRows(board.length)}
    </div>
  );
};

export default Board;

