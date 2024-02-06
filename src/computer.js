import { randomNumber } from "./randomNumber";
import { drawPlayerBoard, drawEnemyBoard } from "./DOMs";
import Ship from "./ship";
export default class Computer {
  constructor() {
    this.stepQueue = [];
  }
  turn(Game) {
    let x = 5;
    let y = 5;

    while (
      Game.enemyBoard.receivedAttacks.join(" ").includes([x, y]) &&
      Game.enemyBoard.receivedAttacks.length < 100
    ) {
      if (this.stepQueue.length !== 0) {
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
      } else {
        x = randomNumber(10);
        y = randomNumber(10);
      }
    }
    //console.log(this.stepQueue)
    Game.enemyBoard.receiveAttack(x, y);
    if (Game.enemyBoard.table[x][y] instanceof Ship) {
      if (!Game.enemyBoard.table[x][y].isSunk()) {
        let steps=[
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ]
        if (x == 0) {
          steps.splice(1,1);        
        }
        if (x == 9) {
          steps.splice(0,1);        
        }
        if (y == 0) {
          steps.splice(2,1);        
        }
        if (y == 9) {
          steps.splice(3,1);        
        }
        this.stepQueue.unshift(steps);


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

    return fleetPlacement;
  }
}
