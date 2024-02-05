import Gameboard from "./src/gameboard.js";
import Computer from "./src/computer.js";



test("computer turn calls the receiveAttack function on players Board", () => {
  let playerBoard = new Gameboard();
  let computer = new Computer();
  computer.turn(playerBoard);
  expect(playerBoard.getReceivedAttacks().length).toBe(1);
});
