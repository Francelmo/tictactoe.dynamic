type CellValue = 'X' | 'O' | null

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

export function getBestMove(board: CellValue[], aiPlayer: CellValue = 'O', humanPlayer: CellValue = 'X'): number {
  // 1. Tenta ganhar
  for (const combo of winningCombos) {
    const [a,b,c] = combo
    const values = [board[a], board[b], board[c]]
    if (values.filter(v => v === aiPlayer).length === 2 && values.includes(null)) {
      return combo[values.indexOf(null)]
    }
  }

  // 2. Tenta bloquear o jogador
  for (const combo of winningCombos) {
    const [a,b,c] = combo
    const values = [board[a], board[b], board[c]]
    if (values.filter(v => v === humanPlayer).length === 2 && values.includes(null)) {
      return combo[values.indexOf(null)]
    }
  }

  // 3. Se nada disso, escolhe aleatório
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter((i): i is number => i !== null)
  
  return empty[Math.floor(Math.random() * empty.length)]
}
