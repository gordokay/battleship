export default class Ship {
  constructor(width) {
    if(!width || typeof width !== 'number') throw new Error('Invalid ship width');
    this.width = width;
    this.hits = 0;
  }

  hit() {
    if(!this.isSunk()) this.hits++;
  }

  isSunk() {
    return this.width === this.hits;
  }
}