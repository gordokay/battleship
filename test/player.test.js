import Player from '../src/player'

test('Create human player named Player1', () => {
  expect(new Player('Player1').name).toBe('Player1');
})

test('Create computer player', () => {
  expect(new Player('Player2', true).isComputer).toBe(true);
})

test('Attack computer gameboard', () => {
  const player1 = new Player('Player1');
  const player2 = new Player('Player2', true);
  player1.attack([0, 0], player2.gameboard);
  expect(player2.gameboard.hits[0]).toBe(true);
})

test('Attack human gameboard', () => {
  const player1 = new Player('Player1');
  const player2 = new Player('Player2', true);
  const [row, col] = player2.getRandomAttack();
  player2.attack([row, col], player1.gameboard);
  expect(player1.gameboard.hits[row * 10 + col]).toBe(true);
})