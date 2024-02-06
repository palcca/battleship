import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.table=[];
    this.receivedAttacks = [];
    for (let x = 0; x < 10; x++) {
      this.table[x] = new Array(10);
    }
  }

  getReceivedAttacks() {
    return this.receivedAttacks;
  }

  //size, pos_x, pos_y, direction
  placeShip(Arr) {
    const ship = new Ship(Arr[0]);
    for (let i = 0; i < Arr[0]; i++) {
      if (Arr[3] === 1) {
        this.table[Arr[1] + i][Arr[2]] = ship;
      } else {
        this.table[Arr[1]][Arr[2] + i] = ship;
      }
    }
  }
  receiveAttack(pos_x, pos_y) {
    this.receivedAttacks.push([pos_x, pos_y]);
    if (this.table[pos_x][pos_y] instanceof Ship) {
      this.table[pos_x][pos_y].hit();
    }
  }

  isAllSunk() {
    for (let i = 0; i < 10; i++) {
      for (let y = 0; y < 10; y++) {
        if (this.table[i][y] instanceof Ship && !this.table[i][y].isSunk()) {
          return false;
        }
      }
    }
    return true;
  }
}
