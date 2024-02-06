import { randomNumber } from "./randomNumber";
export default class Player {
  constructor(name) {
    this.name;
  }

  turn(board, x, y) {
    board.receiveAttack(x, y);
  }

  /*getFleetPlacement() {
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
      for (let i = 0; i <= size; i++) {
        while (dir === 1 && x + size > 9) {
          x = randomNumber(10);
        }

        while (dir === 0 && y + size > 9) {
          y = randomNumber(10);
        }

        while (dir === 1 && table[x + i][y] === 0) {
          i = 0;
          x = randomNumber(10);
          y = randomNumber(10);
          dir = randomNumber(2);
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
          dir = randomNumber(2);
          while (dir === 1 && x + size > 9) {
            x = randomNumber(10);
          }

          while (dir === 0 && y + size > 9) {
            y = randomNumber(10);
          }
        }
      }
      if (dir === 1) {
        let maxc = 1;
        let maxi = size;
        for (let i = -1; i <= maxi; i++) {
          if (x + i < 0) {
            i++;
          } else if (x + maxi > 9) {
            maxi--;
          }

          for (let c = -1; c <= maxc; c++) {
            if (y + c < 0) {
              c++;
            } else if (y + maxc > 9) {
              maxc--;
            }
            table[x + i][y + c] = 0;
          }
        }
      }

      if (dir === 0) {
        let maxc = size;
        let maxi = 1;
        for (let i = -1; i <= maxi; i++) {
          if (x + i < 0) {
            i++;
          } else if (x + maxi > 9) {
            maxi--;
          }

          for (let c = -1; c <= maxc; c++) {
            if (y + c < 0) {
              c++;
            } else if (y + maxc > 9) {
              maxc--;
            }
            table[x + i][y + c] = 0;
          }
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
  }*/
  getFleetPlacement() {
    let fleetPlacement = [[], [], [], [], []];
    //size, pos_x, pos_y, direction
    let table = [[],[],[],[],[],[],[],[],[],[]];
    for (let x = 0; x < 10; x++) {
      for(let y = 0; y<10; y++)
      table[x][y] = "_";
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
        maxi = size ;
      } else {
        maxc=size;
        maxi= 1;
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
    /*for(let i=0; i<10; i++){
      for(let y = 0; y<10; y++){
      }
      console.log([table[0][i]+" "+table[1][i]+" "+table[2][i]+" "+table[3][i]+" "+table[4][i]+" "+table[5][i]+" "+table[6][i]+" "+table[7][i]+" "+table[8][i]+" "+table[9][i]])
    }*/

    return fleetPlacement;
  }
}
