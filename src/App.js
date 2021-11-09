import {useState,useEffect} from "react";
import blueCandy from "./images/blue-candy.png"
import greenCandy from "./images/green-candy.png"
import orangeCandy from "./images/orange-candy.png"
import purpleCandy from "./images/purple-candy.png"
import redCandy from "./images/red-candy.png"
import yellowCandy from "./images/yellow-candy.png"
import "./app.css"


const width=8, CandyColours=[blueCandy,greenCandy,orangeCandy,redCandy,purpleCandy,yellowCandy];


function App() {
const [gameB, setgameB] = useState([])
const [squareBeingDragged, setSquareBeingDragged] = useState(null)
const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

const columnThree=()=>{
  for ( let i=0;i<47;i++){
    const columnOfThree=[i, i+width , i+ (width*2)];
    const decidedColor= gameB[i];

    if (columnOfThree.every(square=>gameB[square]===decidedColor)){
      columnOfThree.forEach(square => gameB[square]="")
    }
  }
}

const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}
const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}
const dragEnd = () => {
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  gameB[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
  gameB[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

}
  function board(){
    const gameBoard=[];
    for (let i=0;i<width*width;i++){
      const colourtoadd= CandyColours[Math.floor(Math.random()*CandyColours.length)]
      gameBoard.push(colourtoadd)
    }
setgameB(gameBoard);
  }

useEffect(() => {
  board()
}, [])

useEffect(() => {
  const timer= setInterval(() => {
    columnThree()
    setgameB([...gameB])
    
  }, 100);
  return ()=>clearInterval(timer)


}, [columnThree])

  return (
    <>
    <div className="game">
    {gameB.map((e,index)=>{
      return (
        <img
        key={index}
        src={e}
        alt=" "
        data-id={index}
        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
        className="gameimg"
        />
      )
    })}
</div>
    </>
  );
}

export default App;
