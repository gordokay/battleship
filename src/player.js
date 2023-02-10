import Gameboard from './gameboard';

export default class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  getRandomAttack(enemyGameboard) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (enemyGameboard.hits[row * 10 + col]);
    return [row, col];
  }

  attack(coordinates, enemyGameboard) {
    enemyGameboard.receiveAttack(coordinates);
  }
}