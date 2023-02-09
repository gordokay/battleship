import Gameboard from './gameboard';

export default class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  getRandomAttack() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return [row, col];
  }

  attack(coordinates, gameboard) {
    gameboard.receiveAttack(coordinates);
  }
}