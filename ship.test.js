import Ship from "./src/ship";

test("return true if sunk", () => {
  let ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("return false if not sunk", ()=>{
    let ship = new Ship(2);
    expect(ship.isSunk()).toBe(false);
});