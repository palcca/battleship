import Gameboard from "./src/gameboard.js";

test("calls the hit function on the ship", () => {
  class Ship {
    constructor(size) {
      this.size = size;
      this.hits = 0;
    }

    hit() {
      this.hits++;
    }

    isSunk() {
      return this.size - this.hits === 0 ? true : false;
    }
  }
  let gameboard = new Gameboard();
  gameboard.placeShip(3, 2, 2);
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);
  expect(gameboard.table[2][2].hits).toBe(3);
});

test("return true if all ship is sunk", () => {
  class Ship {
    constructor(size) {
      this.size = size;
      this.hits = 0;
    }

    hit() {
      this.hits++;
    }

    isSunk() {
      return this.size - this.hits === 0 ? true : false;
    }
  }
  let gameboard = new Gameboard();
  gameboard.placeShip(3, 2, 2);
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);
  expect(gameboard.isAllSunk()).toBe(true);
});

test("return false if not all ships sunk", () => {
  class Ship {
    constructor(size) {
      this.size = size;
      this.hits = 0;
    }

    hit() {
      this.hits++;
    }

    isSunk() {
      return this.size - this.hits === 0 ? true : false;
    }
  }
  let gameboard = new Gameboard();
  gameboard.placeShip(3, 2, 2);
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 4);
  expect(gameboard.isAllSunk()).toBe(false);
});

