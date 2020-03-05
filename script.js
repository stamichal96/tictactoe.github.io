const x_cl = 'x'
const o_cl = 'o'
const win_com = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const boxEl = document.querySelectorAll('[data-box]')
const board = document.getElementById('board')
const winMes = document.getElementById('winningMessage')
const resBut = document.getElementById('resBut')
const winText = document.querySelector('[data-winning-message-text]')
let oTurn

startGame()

resBut.addEventListener('click', startGame)

function startGame() {
  oTurn = false
  boxEl.forEach(box => {
    box.classList.remove(x_cl)
    box.classList.remove(o_cl)
    box.removeEventListener('click', handleClick)
    box.addEventListener('click', handleClick, { once: true })
  })
  setHover()
  winMes.classList.remove('show')
}

function handleClick(e) {
  const box = e.target
  const curClass = oTurn ? o_cl : x_cl
  markIt(box, curClass)
  if (checkWin(curClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    switchTurns()
    setHover()
  }
}

function endGame(draw) {
  if (draw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  winMes.classList.add('show')
}

function isDraw() {
  return [...boxEl].every(box => {
    return box.classList.contains(x_cl) || box.classList.contains(o_cl)
  })
}

function markIt(box, curClass) {
  box.classList.add(curClass)
}

function switchTurns() {
  oTurn = !oTurn
}

function setHover() {
  board.classList.remove(x_cl)
  board.classList.remove(o_cl)
  if (oTurn) {
    board.classList.add(o_cl)
  } else {
    board.classList.add(x_cl)
  }
}

function checkWin(curClass) {
  return win_com.some(combination => {
    return combination.every(index => {
      return boxEl[index].classList.contains(curClass)
    })
  })
}