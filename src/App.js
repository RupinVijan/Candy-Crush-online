import { useState, useEffect } from "react";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import "./app.css";

const width = 8,
  CandyColours = [
    blueCandy,
    greenCandy,
    orangeCandy,
    redCandy,
    purpleCandy,
    yellowCandy,
  ];

function App() {
  const [gameB, setgameB] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const columnThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = gameB[i];

      if (columnOfThree.every((square) => gameB[square] === decidedColor)) {
        columnOfThree.forEach((square) => (gameB[square] = ""));
        setScoreDisplay((score)=>score+3)
      }
    }
  };

  const columnFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfThree = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = gameB[i];

      if (columnOfThree.every((square) => gameB[square] === decidedColor)) {
        columnOfThree.forEach((square) => (gameB[square] = ""));
        setScoreDisplay((score)=>score+4)
      }
    }
  };
  const rowFour = () => {
    for (let i = 0; i <= 63; i++) {
      const columnOfThree = [i, i + 1, i + 1 * 2, i + 1 * 3];
      const decidedColor = gameB[i];

      if (columnOfThree.every((square) => gameB[square] === decidedColor)) {
        columnOfThree.forEach((square) => (gameB[square] = ""));
        setScoreDisplay((score)=>score+4)
      }
    }
  };
  const rowThree = () => {
    for (let i = 0; i <= 63; i++) {
      const columnOfThree = [i, i + 1, i + 1 * 2];
      const decidedColor = gameB[i];

      if (columnOfThree.every((square) => gameB[square] === decidedColor)) {
        columnOfThree.forEach((square) => (gameB[square] = ""));
        setScoreDisplay((score)=>score+3)
      }
    }
  };

  const movecandy = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && gameB[i] === "") {
        let randomNumber = Math.floor(Math.random() * CandyColours.length);
        gameB[i] = CandyColours[randomNumber];
      }
      if (gameB[i + width] === "") {
        gameB[i + width] = gameB[i];
        gameB[i] = "";
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    gameB[squareBeingReplacedId] = squareBeingDragged.getAttribute("src");
    gameB[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
  ]

  const validMove = validMoves.includes(squareBeingReplacedId)

  const isAColumnOfFour = columnFour()
  const isARowOfFour = rowFour()
  const isAColumnOfThree = columnThree()
  const isARowOfThree = rowThree()
  if (squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
} else {
    gameB[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
    gameB[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
    setgameB([...gameB])
}
  };
  function board() {
    const gameBoard = [];
    for (let i = 0; i < width * width; i++) {
      const colourtoadd =
        CandyColours[Math.floor(Math.random() * CandyColours.length)];
      gameBoard.push(colourtoadd);
    }
    setgameB(gameBoard);
  }

  useEffect(() => {
    board();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      columnFour();
      columnThree();
      rowFour();
      rowThree();
      movecandy();
      setgameB([...gameB]);
    }, 500);
    return () => clearInterval(timer);
  }, [columnThree, columnFour, rowThree, movecandy, rowFour, gameB]);

  return (
    <>
        <h1>Rupin-Crush-Candy </h1>
        <h1>Score :: {scoreDisplay}</h1><br/>
      <div className="game">
        {gameB.map((e, index) => {
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
          );
        })}<h1>Made By Rupin Vijan</h1>
      </div>
    </>
  );
}

export default App;
