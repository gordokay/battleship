import Event from "./event";
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.hits = new Array(100).fill(false);
    this.shipGrid = new Array(100);
    this.ships = [];
    this.#randomizeShipPlacement();
  }

  placeShip(start, end) {
    this.#validateShipPlacement(start, end);
    let ship;
    //places horizontal ship
    if(start[0] === end[0]) {
      ship = new Ship(Math.abs(start[1] - end[1]) + 1);
      for(let i = Math.min(start[1], end[1]); i <= Math.max(start[1], end[1]); i++) {
        this.shipGrid[this.#convertToIndex(start[0], i)] = ship;
      }
    } 
    //places vertical ship
    else {
      ship = new Ship(Math.abs(start[0] - end[0]) + 1);
      for(let i = Math.min(start[0], end[0]); i <= Math.max(start[0], end[0]); i++) {
        this.shipGrid[this.#convertToIndex(i, start[1])] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    this.#validateCoordinates(coordinates[0], coordinates[1]);
    const index =  this.#convertToIndex(coordinates[0], coordinates[1]);
    if(this.hits[index]) return;
    this.hits[index] = true;
    if(this.shipGrid[index]) {
      this.shipGrid[index].hit();
      Event.emit('hit', coordinates);
      return;
    }
    Event.emit('normal hit', coordinates);
  }

  isShipAt(coordinates) {
    this.#validateCoordinates(coordinates[0], coordinates[1]);
    if(this.shipGrid[this.#convertToIndex(coordinates[0], coordinates[1])]) return true;
    return false;
  }

  getShipAt(coordinates) {
    this.#validateCoordinates(coordinates[0], coordinates[1]);
    return this.shipGrid[this.#convertToIndex(coordinates[0], coordinates[1])];
  }

  allSunk() {
    for(let ship of this.ships) {
      if(!ship.isSunk()) return false;
    }
    return true;
  }

  #validateCoordinates(row, col) {
    if(row < 0 || col < 0 || row >= 10 || col >= 10) throw new Error('Coordinates out of bounds');
  }

  #validateShipPlacement(start, end) {
    this.#validateCoordinates(start[0], start[1]);
    this.#validateCoordinates(end[0], end[1]);
    if(start[0] !== end[0] && start[1] !== end[1]) throw new Error('Cannot place ships diagonally');
    //checks length of horizontal ships
    if(start[0] === end[0] && (Math.abs(start[1] - end[1]) < 0 || Math.abs(start[1] - end[1]) > 5)) {
      throw new Error('Ships must be between 1 and 5 units long');
    }
    //checks length of vertical ships
    if(start[1] === end[1] && (Math.abs(start[0] - end[0]) < 0 || Math.abs(start[0] - end[0]) > 5)) {
      throw new Error('Ships must be between 1 and 5 units long');
    }
    //checks overlap of horizontal ships
    if(start[0] === end[0]) {
      for(let i = Math.min(start[1], end[1]); i <= Math.max(start[1], end[1]); i++) {
        if(this.isShipAt([start[0], i])) throw new Error('Cannot place ships on top of each other');
      }
    }
    //checks overlap of vertical ships
    if(start[1] === end[1]) {
      for(let i = Math.min(start[0], end[0]); i <= Math.max(start[0], end[0]); i++) {
        if(this.isShipAt([i, start[1]])) throw new Error('Cannot place ships on top of each other');
      }
    }
  }

  #convertToIndex(row, col) {
    return row * 10 + col;
  }

  #randomizeShipPlacement() {
    const shipLengths = [5, 4, 3, 2, 2, 1, 1];
    for(let length of shipLengths) {
      let valid = true;
      let startRow, endRow, startCol, endCol;
      do {
        const isVertical = Math.floor(Math.random() * 2);
        if(isVertical) {
          startRow = Math.floor(Math.random() * 10);
          endRow = startRow > (10 - length) ? startRow - (length - 1) : startRow + (length - 1);
          startCol = Math.floor(Math.random() * 10);
          endCol = startCol;
        } else {
          startCol = Math.floor(Math.random() * 10);
          endCol = startCol > (10 - length) ? startCol - (length - 1) : startCol + (length - 1);
          startRow = Math.floor(Math.random() * 10);
          endRow = startRow;
        }
        try {
          this.placeShip([startRow, startCol], [endRow, endCol]);
          valid = true;
        } catch {
          valid = false;
        }
      } while(!valid);
    }
  }
}