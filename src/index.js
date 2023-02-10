import init from "./game";
import Event from "./event";

const optionsSection = document.getElementById('options');
const playerSection = document.getElementById('players');
const mainGameboardSection = document.getElementById('main-gameboard');
const auxGameboardSection = document.getElementById('aux-gameboard');

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
    this.classList.add('hit');
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
      mainCell.setAttribute('data-row', i);
      mainCell.setAttribute('data-col', j);
      mainRow.appendChild(mainCell);
      const auxCell = document.createElement('div');
      auxCell.classList.add('cell');
      auxCell.setAttribute('data-row', i);
      auxCell.setAttribute('data-col', j);
      auxRow.appendChild(auxCell);
    }
    mainGameboardSection.appendChild(mainRow);
    auxGameboardSection.appendChild(auxRow);
  }
}

function bindEvents() {
  Event.subscribe(window, 'change turn', toggleInputEnabled);
  Event.subscribe(window, 'ship placement', renderShips);
  Event.subscribe(window, 'hit', updateCell);
  Event.subscribe(window, 'normal hit', updateAuxCell);
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

function updateCell(coordinates) {
  const row = coordinates[0];
  const col = coordinates[1];
  const cell = document.querySelector(`#${isInputEnabled ? "main" : "aux"}-gameboard [data-row="${row}"][data-col="${col}"]`);
  if(isInputEnabled)   cell.classList.add('ship');
  else cell.classList.add('enemy-hit');
}

function updateAuxCell(coordinates) {
  if(!isInputEnabled) {
    const row = coordinates[0];
    const col = coordinates[1];
    const cell = document.querySelector(`#aux-gameboard [data-row="${row}"][data-col="${col}"`);
    cell.classList.add('hit');
  }
}

function toggleInputEnabled(player) {
  if(player === 'player1') isInputEnabled = true;
  else isInputEnabled = false;
}