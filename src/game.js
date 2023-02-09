import Player from "./player";
import Event from "./event";

export default function init(p1 = "Player 1", p2 = "Player 2", isPlayingComputer) {
  const player1 = new Player(p1);
  const player2 = new Player(p2, isPlayingComputer);
  Event.subscribe(player1, "attack", player1.attack, [player2.gameboard]);
}