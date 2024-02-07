import { randomNumber } from "./randomNumber";
import { drawPlayerBoard, drawEnemyBoard } from "./DOMs";
import Ship from "./ship";
export default class Computer {
  constructor() {
    this.stepQueue = [];
    this.lastHit = [];
    this.table = [[], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 10; i++) {
      for (let y = 0; y < 10; y++) {
        this.table[i][y] = " ";
      }
    }
  }
  turn(Game) {
    
    let result;
    let x = 5;
    let y = 5;
    while (
      Game.enemyBoard.receivedAttacks.join(" ").includes([x, y]) ||
      this.table[x][y] === 0
    ) {
      if (this.stepQueue[0] == [[]]) {
        this.stepQueue.shift();
      }
      if (this.stepQueue.length !== 0) {
        if (this.stepQueue[0].length !== 0) {
          if (this.stepQueue[0][0].length !== 0) {
            x = this.stepQueue[0][0][0];
            y = this.stepQueue[0][0][1];
            this.stepQueue[0].shift();
            if (this.stepQueue[0].length === 0) {
              this.stepQueue.shift();
            }
            if (
              Game.enemyBoard.table[x][y] instanceof Ship &&
              Game.enemyBoard.table[x][y].isSunk()
            ) {
              this.stepQueue.shift();
            }
          }
        }
      } else {
        x = randomNumber(10);
        y = randomNumber(10);
      }
    }
    Game.enemyBoard.receiveAttack(x, y);
    if (Game.enemyBoard.table[x][y] instanceof Ship) {
      if (!Game.enemyBoard.table[x][y].isSunk()) {
        let steps = [
          [x + 1, y],
          [x, y + 1],
          [x - 1, y],
          [x, y - 1],
        ];
        if (
          x === this.lastHit[0] &&
          Game.enemyBoard.table[x][y] ===
            Game.enemyBoard.table[this.lastHit[0]][this.lastHit[1]] &&
          Game.enemyBoard.table[x][y].hits > 0
        ) {
          steps.splice(0, 1);
          steps.splice(1, 1);
        } else if (
          y === this.lastHit[1] &&
          Game.enemyBoard.table[x][y] ===
            Game.enemyBoard.table[this.lastHit[0]][this.lastHit[1]] &&
          Game.enemyBoard.table[x][y].hits > 0
        ) {
          steps.splice(1, 1);
          steps.splice(2, 1);
        } else {
          if(x==0 && y ==0){
            steps.splice(2,2)
          }else if(x==9&&y==9){
            steps.splice(0,2);
          } else {
          if (x === 0) {
            steps.splice(2, 1);
          }
          if (x === 9) {
            steps.splice(0, 1);
          }
          if (y === 0) {
            steps.splice(3, 1);
          }
          if (y === 9) {
            steps.splice(1, 1);          
          }}
        }
        this.stepQueue.unshift(steps);
        if (
          x === this.lastHit[0] &&
          Game.enemyBoard.table[x][y] ===
            Game.enemyBoard.table[this.lastHit[0]][this.lastHit[1]] &&
          Game.enemyBoard.table[x][y].hits === 2 &&
          !Game.enemyBoard.table[x][y].isSunk()
        ) {
          if (this.stepQueue.length > 1) {
            result = this.stepQueue[1].filter((a) => a[0] === x);
            this.stepQueue[1] = result;
            if (this.stepQueue[1].join("") == [].join("")) {
              this.stepQueue.pop();
            }
          }
        }

        if (
          y === this.lastHit[1] &&
          Game.enemyBoard.table[x][y] ===
            Game.enemyBoard.table[this.lastHit[0]][this.lastHit[1]] &&
          Game.enemyBoard.table[x][y].hits === 2 &&
          !Game.enemyBoard.table[x][y].isSunk()
        ) {
          if (this.stepQueue.length > 1) {
            result = this.stepQueue[1].filter((a) => a[1] === y);

            this.stepQueue[1] = result;
            if (this.stepQueue[1].join("") == [].join("")) {
              this.stepQueue.pop();
            }
          }
        }

        this.lastHit = [x, y];
      }
    }
    if (
      Game.enemyBoard.table[x][y] instanceof Ship &&
      Game.enemyBoard.table[x][y].isSunk()
    ) {
      let ship = Game.enemyBoard.table[x][y];
      let size = Number(ship.size);
      let shipPlace = [];
      for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
          if (
            Game.enemyBoard.table[a][b] instanceof Ship &&
            Game.enemyBoard.table[a][b] === ship
          ) {
            shipPlace.push([a, b]);
          }
        }
      }

      let maxc;
      let maxi;
      if (shipPlace[0][0] === shipPlace[ship.size - 1][0]) {
        maxc = size;
        maxi = 1;
      } else {
        maxc = 1;
        maxi = size;
      }

      for (let i = -1; i <= maxi; i++) {
        if (x + i < 0) {
          i = 0;
        } else if (x + maxi > 9) {
          maxi--;
        }

        for (let c = -1; c <= maxc; c++) {
          if (y + c < 0) {
            c = 0;
          } else if (y + maxc > 9) {
            maxc--;
          }
          this.table[x + i][y + c] = 0;
        }
      }
    }
  }

  getFleetPlacement() {
    let fleetPlacement = [[], [], [], [], []];
    //size, pos_x, pos_y, direction
    let table = [];
    for (let x = 0; x < 10; x++) {
      table[x] = new Array(10);
    }

    function getRandomPlace(size) {
      let x = randomNumber(10);
      let y = randomNumber(10);
      let dir = randomNumber(2);
      while (dir === 1 && x + size > 9) {
        x = randomNumber(10);
      }

      while (dir === 0 && y + size > 9) {
        y = randomNumber(10);
      }
      for (let i = 0; i <= size; i++) {
        while (dir === 1 && table[x + i][y] === 0) {
          i = 0;
          x = randomNumber(10);
          y = randomNumber(10);
          while (dir === 1 && x + size > 9) {
            x = randomNumber(10);
          }

          while (dir === 0 && y + size > 9) {
            y = randomNumber(10);
          }
        }

        while (dir === 0 && table[x][y + i] === 0) {
          i = 0;
          x = randomNumber(10);
          y = randomNumber(10);
          while (dir === 1 && x + size > 9) {
            x = randomNumber(10);
          }

          while (dir === 0 && y + size > 9) {
            y = randomNumber(10);
          }
        }
      }
      let maxc;
      let maxi;
      if (dir === 1) {
        maxc = 1;
        maxi = size;
      } else {
        maxc = size;
        maxi = 1;
      }

      for (let i = -1; i <= maxi; i++) {
        if (x + i < 0) {
          i = 0;
        } else if (x + maxi > 9) {
          maxi--;
        }

        for (let c = -1; c <= maxc; c++) {
          if (y + c < 0) {
            c = 0;
          } else if (y + maxc > 9) {
            maxc--;
          }
          table[x + i][y + c] = 0;
        }
      }
      return [size, x, y, dir];
    }

    fleetPlacement[0] = getRandomPlace(5);
    fleetPlacement[1] = getRandomPlace(4);
    fleetPlacement[2] = getRandomPlace(3);
    fleetPlacement[3] = getRandomPlace(3);
    fleetPlacement[4] = getRandomPlace(2);
    fleetPlacement[5] = getRandomPlace(1);
    fleetPlacement[6] = getRandomPlace(1);
    fleetPlacement[7] = getRandomPlace(1);
    fleetPlacement[8] = getRandomPlace(2);


    return fleetPlacement;
  }
}
