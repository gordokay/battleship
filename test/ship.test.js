import Ship from '../src/ship';

test('Create a ship of width 4', () => {
  expect(new Ship(4).width).toBe(4);
})

test('Throw error on invalid ship width', () => {
  expect(() => new Ship(0)).toThrow("Invalid ship width");
})

test('Return 0 hits on new ship', () => {
  expect(new Ship(4).hits).toBe(0);
})

test('Increase hits by 1 when hit and not sunk', () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.hits).toBe(1);
})

test('Sink ship when hits equal width', () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
})

test('Do not increase hits when ship is sunk', () => {
  const ship = new Ship(1);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(1);
})

