import Gameboard from "./gameboard";
import Ship from "./ship";
import Computer from "./computer";

export function drawPlayerBoard(Game) {
  const gameContainer = document.querySelector("#gameContainer");
  const board = document.createElement("div");
  board.classList.add("board");
  for (let x = 0; x < 10; x++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    board.appendChild(boardRow);
    for (let y = 0; y < 10; y++) {
      const tile = document.createElement("div");
      tile.classList.add("emptyTile");
      tile.addEventListener("click", () => {
        if (!Game.playerBoard.receivedAttacks.join(" ").includes([x, y])) {
          Game.playerBoard.receiveAttack(x, y);
          tile.classList.add("hit");
          if (Game.playerBoard.table[x][y] instanceof Ship) {
            tile.classList.remove("emptyTile");
            tile.classList.add("ship");
            if(Game.playerBoard.table[x][y].isSunk()){
              document.querySelector("#turnResult").textContent = "Hit & sunk! Ship size:"+Game.playerBoard.table[x][y].size;
            } else {
              document.querySelector("#turnResult").textContent = "Hit! Ship size:"+Game.playerBoard.table[x][y].size;
            }
          }

          tile.textContent = "X";
          Game.computer.turn(Game);
          gameContainer.removeChild(gameContainer.lastChild);
          drawEnemyBoard(Game);
          if(Game.playerBoard.isAllSunk()){
            document.querySelector("#turnResult").textContent = "Player Wins";
          }
          if(Game.enemyBoard.isAllSunk()){
            document.querySelector("#turnResult").textContent = "Computer Wins";
          }
        }
      });
      boardRow.appendChild(tile);
    }
  }

  gameContainer.appendChild(board);
}

export function drawEnemyBoard(Game) {
  const gameContainer = document.querySelector("#gameContainer");
  const board = document.createElement("div");
  board.classList.add("board");
  for (let x = 0; x < 10; x++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");

    for (let y = 0; y < 10; y++) {
      const tile = document.createElement("div");
      if (Game.enemyBoard.getReceivedAttacks().join(" ").includes([x, y])) {
        tile.classList.add("hit");
        tile.textContent = "+";
      }
      if (Game.enemyBoard.table[x][y] instanceof Ship) {
        tile.classList.add("ship");
      } else {
        tile.classList.add("emptyTile");
      }
      board.appendChild(boardRow);
      boardRow.appendChild(tile);
    }
  }
  gameContainer.appendChild(board);
}
