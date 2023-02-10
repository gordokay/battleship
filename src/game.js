import Player from "./player";
import Event from "./event";

export default function init(p1 = "Player 1", p2 = "Player 2", isPlayingComputer) {
  const player1 = new Player(p1);
  Event.emit('ship placement', player1.gameboard.shipGrid);
  const player2 = new Player(p2, isPlayingComputer);
  Event.subscribe(player1, "attack", player1.attack, [player2.gameboard]);
  let currentPlayer = "player1";
  while(!player1.gameboard.allSunk() && !player2.gameboard.allSunk()) {
    Event.emit('change turn', currentPlayer);
    currentPlayer = 'player2';
  }
}