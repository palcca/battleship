import Gameboard from "./gameboard";
import Ship from "./ship";
import Computer from "./computer";

export function drawPlayerBoard(Game) {
  const gameContainer = document.querySelector("#gameContainer");
  const board = document.createElement("div");
  const turnResult = document.querySelector(".turnResult");
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
          turnResult.textContent = "Miss";
          Game.playerBoard.receiveAttack(x, y);
          tile.classList.add("hit");
          if (Game.playerBoard.table[x][y] instanceof Ship) {
            tile.classList.remove("emptyTile");
            tile.classList.add("ship");

            if (Game.playerBoard.table[x][y].isSunk()) {
              turnResult.textContent =
                "Hit & sunk! Ship size:" + Game.playerBoard.table[x][y].size;
            } else {
              turnResult.textContent =
                "Hit! Ship size:" + Game.playerBoard.table[x][y].size;
            }
          }

          tile.textContent = "X";
          Game.computer.turn(Game);
          gameContainer.removeChild(gameContainer.lastChild);
          drawEnemyBoard(Game);
          if (Game.playerBoard.isAllSunk()) {
            gameContainer.removeChild(gameContainer.lastChild);
            gameContainer.removeChild(gameContainer.firstChild);
            turnResult.textContent = "Player Wins";
            turnResult.classList.add("win");
          } else if (Game.enemyBoard.isAllSunk()) {
            gameContainer.removeChild(gameContainer.firstChild);
            gameContainer.removeChild(gameContainer.lastChild);
            turnResult.textContent = "Computer Wins";
            turnResult.classList.add("win");
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
