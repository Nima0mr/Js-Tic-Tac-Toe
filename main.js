const xClass = 'x'
const oClass = 'circle'
const winPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let circleTurn

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('#data-winning-message-text')


const startGame= () => {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

const handleClick = (e) => {
  const cell = e.target
  const currentClass = circleTurn ? oClass : xClass
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    changeTurn()
    setBoardHoverClass()
  }
}

const endGame = (draw) => {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O " : "X "} Won!`
  }
  winningMessageElement.classList.add('show')
}

const isDraw= () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass)
}

const changeTurn= () => {
  circleTurn = !circleTurn
}

const setBoardHoverClass= () => {
  board.classList.remove(xClass)
  board.classList.remove(oClass)
  if (circleTurn) {
    board.classList.add(oClass)
  } else {
    board.classList.add(xClass)
  }
}

const checkWin = (currentClass) => {
  return winPossibilities.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

const init = () => {
  startGame()
  restartButton.addEventListener('click', startGame)
}

init()

