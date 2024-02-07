import { randomNumber } from "./randomNumber";
export default class Player {
  constructor(name) {
    this.name;
  }

  turn(board, x, y) {
    board.receiveAttack(x, y);
  }
}
