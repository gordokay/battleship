import init from "./game";
import Event from "./event";

const optionsSection = document.getElementById('options');
const playerSection = document.getElementById('players');
const mainGameboardSection = document.getElementById('main-gameboard');
const auxGameboardSection = document.getElementById('aux-gameboard');
const boardLabels = document.querySelectorAll('h2');
const message = document.querySelector('.message');

const player2Container = document.getElementById('player2-container');

const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

const playOtherButton = document.getElementById('play-other');
const playComputerButton = document.getElementById('play-computer');

const startButton = document.getElementById('start');
let isPlayingComputer;

let isInputEnabled = false;

playOtherButton.addEventListener('click', () => {
  showPlayerSection(playOtherButton.id);
  isPlayingComputer = false;
});

playComputerButton.addEventListener('click', () => {
  showPlayerSection(playComputerButton.id);
  isPlayingComputer = true;
});

startButton.addEventListener('click', () => {
  hidePlayerSection();
  renderGameboards();
  bindEvents();
  init(player1Input.value, player2Input.value, isPlayingComputer);
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
  if(isInputEnabled) {
    Event.emit('attack', [+this.getAttribute('data-row'), +this.getAttribute('data-col')]);
    isInputEnabled = false;
    Event.emit('step');
  }
}

function renderGameboards() {
  for(let i = 0; i < 10; i++) {
    const mainRow = document.createElement('div');
    mainRow.classList.add('row');
    const auxRow = document.createElement('div');
    auxRow.classList.add('row');
    for(let j = 0; j < 10; j++) {
      const mainCell = document.createElement('div');
      mainCell.classList.add('cell');
      setCellCoordinates(mainCell, i, j);
      mainRow.appendChild(mainCell);

      const auxCell = document.createElement('div');
      auxCell.classList.add('cell');
      setCellCoordinates(auxCell, i, j);
      auxRow.appendChild(auxCell);
    }
    mainGameboardSection.appendChild(mainRow);
    auxGameboardSection.appendChild(auxRow);
    boardLabels.forEach(label => label.classList.remove('hidden'));
  }
}

function setCellCoordinates(cell, row, col) {
  cell.setAttribute('data-row', row);
  cell.setAttribute('data-col', col);
}
function bindEvents() {
  Event.subscribe(window, 'change turn', enableInput);
  Event.subscribe(window, 'ship placement', renderShips);
  Event.subscribe(window, 'attack received', updateCell);
  Event.subscribe(window, 'win', updateWinMessage);
  const mainCells = document.querySelectorAll('#main-gameboard .cell');
  mainCells.forEach(cell => cell.addEventListener('click', makeClickable, { once: true }));
}

function renderShips(ships) {
  const auxCells = document.querySelectorAll('#aux-gameboard .cell');
  let i = 0;
  auxCells.forEach(cell => {
    if(ships[i]) cell.classList.add('ship');
    i++;
  });
}

function updateWinMessage(winner) {
  message.textContent = `${winner} won`;
}

function updateCell(data) {
  const [ coordinates, isHit ] = data;
  const row = coordinates[0];
  const col = coordinates[1];
  const cell = document.querySelector(`#${isInputEnabled ? "main" : "aux"}-gameboard [data-row="${row}"][data-col="${col}"]`);
  if(!isHit) cell.classList.add('miss');
  else cell.classList.add('hit');
}

function enableInput() {
  isInputEnabled = true;
}