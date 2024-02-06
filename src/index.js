import _ from "lodash";
import "./style.css";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { randomNumber } from "./randomNumber.js";
import { drawEnemyBoard, drawPlayerBoard } from "./DOMs.js";

class Game {
  constructor(PlayerName) {
    this.enemyBoard = new Gameboard();
    this.playerBoard = new Gameboard();
    this.player = new Player(PlayerName);
    this.computer = new Computer();
    this.turn = 0;
  }

  drawGame() {
    let comFleet = this.computer.getFleetPlacement();
    let playerFleet = this.player.getFleetPlacement();
    for (let i = 0; i < 5; i++) {
      this.playerBoard.placeShip(comFleet[i]);
      this.enemyBoard.placeShip(playerFleet[i]);
    }
    drawPlayerBoard(this);
    drawEnemyBoard(this);
  }
}
let game;

const newGameBtn = document.querySelector("#newGameBtn");
newGameBtn.addEventListener("click", () => {
  game = new Game("Player");
  game.drawGame();
  document.querySelector(".turnResult").classList.remove("win");
  document.querySelector(".turnResult").textContent = "";
});
