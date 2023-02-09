import init from "./game";

const optionsSection = document.getElementById('options');
const playerSection = document.getElementById('players');
const gameboardSection = document.getElementById('gameboard');

const player2Container = document.getElementById('player2-container');

const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

const playOtherButton = document.getElementById('play-other');
const playComputerButton = document.getElementById('play-computer');

const startButton = document.getElementById('start');

playOtherButton.addEventListener('click', () => showPlayerSection(playOtherButton.id));
playComputerButton.addEventListener('click', () => showPlayerSection(playComputerButton.id));

startButton.addEventListener('click', () => {
  hidePlayerSection();
  renderGameboard();
});

function showPlayerSection(option) {
  optionsSection.classList.add('hidden');
  playerSection.classList.remove('hidden');
  if(option === 'play-computer') {
    player2Container.classList.add('hidden');
  }
}

function hidePlayerSection() {
  playerSection.classList.add('hidden');
}

function makeClickable() {
  this.classList.add('hit');
}

function renderGameboard() {
  for(let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for(let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', makeClickable, { once: true });
      row.appendChild(cell);
    }
    gameboardSection.appendChild(row);
  }
}