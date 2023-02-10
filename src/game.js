import Player from "./player";
import Event from "./event";

export default function init(p1 = "Player 1", p2 = "Player 2", isPlayingComputer) {
  const player1 = new Player(p1);
  Event.emit('ship placement', player1.gameboard.shipGrid);
  const player2 = new Player(p2, isPlayingComputer);
  Event.subscribe(player1, "attack", player1.attack, [player2.gameboard]);
  Event.emit('change turn', 'player1');
  Event.subscribe(window, 'step', step, [player1, player2]);
}

function step(player1, player2) {
  player2.attack(player2.getRandomAttack(), player1.gameboard);
  Event.emit('change turn', 'player1');
}