import Player from "./player";
import Event from "./event";

export default function init(p1, p2, isPlayingComputer) {
  const player1 = new Player(p1 || "Player 1");
  Event.emit('ship placement', player1.gameboard.shipGrid);
  const player2 = new Player(p2 || "Player 2", isPlayingComputer);
  Event.subscribe(player1, "attack", player1.attack, [player2.gameboard]);
  Event.emit('change turn');
  Event.subscribe(window, 'step', step, [player1, player2]);
}

function step(player1, player2) {
  if(checkWin(player1, player2)) return;
  setTimeout(() => {
    player2.attack(player2.getRandomAttack(player1.gameboard), player1.gameboard);
    if(checkWin(player2, player1)) return;
    Event.emit('change turn');
  }, 500);
}

function checkWin(currentPlayer, enemyPlayer) {
  if(enemyPlayer.gameboard.allSunk()) {
    Event.emit('win', currentPlayer.name);
    return true;
  }
  return false;
}