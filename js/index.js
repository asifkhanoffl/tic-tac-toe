const boxes = document.querySelectorAll(".box");
const statusTxt = document.querySelector("#status");
const restart = document.querySelector("#restart");
let x = "<img src='../img/x.png'>";
let o = "<img src='../img/o.png'>";
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();
function init() {
  boxes.forEach((box) => box.addEventListener("click", boxClick));
  statusTxt.textContent = `${player} your turn`;
  running = true;
  restart.addEventListener("click", restartGame);
}
function boxClick() {
  const index = this.dataset.index;
  if (option[index] != "" || !running) {
    return;
  }
  update(this, index);
  checkWinner();
}
function update(box, index) {
  option[index] = player;
  box.innerHTML = currentPlayer;
}
function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  statusTxt.textContent = `${player} Your turn`;
}
function checkWinner() {
  let isWon = false;
  for (i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = option[condition[0]];
    const box2 = option[condition[1]];
    const box3 = option[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxes[condition[0]].classList.add("win");
      boxes[condition[1]].classList.add("win");
      boxes[condition[2]].classList.add("win");
    }
  }
  if (isWon) {
    statusTxt.textContent = `${player} Won`;
    running = false;
  } else if (!option.includes("")) {
    statusTxt.textContent = `Match draw..`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  option = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  statusTxt.textContent = `${player} Your turn`;
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
}
