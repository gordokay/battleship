import Gameboard from '../src/gameboard';

test('No ship at empty coordinates', () => {
  expect(new Gameboard().isShipAt([0, 0])).toBe(false);
})

test('Place ship at valid coordinates', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 3]);
  expect(gameboard.isShipAt([0, 0])).toBe(true);
})

test('Throw error for out of bounds coordinates', () => {
  expect(() => new Gameboard().placeShip([-1, -1], [10, 10])).toThrow('Coordinates out of bounds');
})

test('Throw error for diagonal coordinates', () => {
  expect(() => new Gameboard().placeShip([0, 0], [3, 1])).toThrow('Cannot place ships diagonally');
})

test('Throw error for invalid coordinate distance', () => {
  expect(() => new Gameboard().placeShip([0, 0], [0, 6])).toThrow('Ships must be between 1 and 5 units long');
})

test('Throw error for occupied coordinates', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 3]);
  expect(() => gameboard.placeShip([0, 0], [0, 3])).toThrow('Cannot place ships on top of each other');
})

test('No hits on empty gameboard', () => {
  const gameboard = new Gameboard();
  expect(gameboard.hits[0]).toBe(false);
})

test('Receives attack for empty coordinates', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.hits[0]).toBe(true);
})

test('Hits ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 3]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.getShipAt([0, 0]).hits).toBe(1);
})

test('Ignores attacks on previously hit coordinates', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 3]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.getShipAt([0, 0]).hits).toBe(1);
})

test('Throw error for invalid coordinates', () => {
  expect(() => new Gameboard().receiveAttack([-1, -1])).toThrow('Coordinates out of bounds');
})

test('Sinks ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(gameboard.getShipAt([0, 0]).isSunk()).toBe(true);
})

test('Reports when all ships are sunk', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(gameboard.allSunk()).toBe(true);
})

test('Reports when all ships are not sunk', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], [0, 1]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.allSunk()).toBe(false);
})