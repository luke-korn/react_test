import { useState, useEffect } from "react";
import "./style.css";
import { new_board } from "./empty_board";
import Board from "./Board";

function Puzzle() {
  const [size, setsize] = useState(4)
  const [boar, setboard] = useState(new_board(size));
  const [playing, setPlaying] = useState(false);
  useEffect(()=>{
    const newBoard = new_board(size)
    setboard(newBoard)
  },[size])

  return (
    <>
      {playing ? (
        <div>
          <Board board={boar} setBoard={setboard} setPlaying={setPlaying} />
          <div >
            <button style={{marginTop:'100px'}} onClick={()=>{setPlaying(false)}}>Cancel</button>

          </div>
        </div>
      ) : (
          <div>
            <div className="start_state">Choose Size:
            </div>
            <button onClick={() => { setsize(2); setPlaying(true) }} className='size_opotion'>2</button>
            <button onClick={() => { setsize(3); setPlaying(true) }} className='size_opotion'>3</button>
            <button onClick={() => { setsize(4); setPlaying(true) }} className='size_opotion'>4</button>
            <button onClick={() => { setsize(5); setPlaying(true) }} className='size_opotion'>5</button>
            <button onClick={() => { setsize(6); setPlaying(true) }} className='size_opotion'>6</button>
          </div>
      )}
      </>
  );
}

export default Puzzle;

