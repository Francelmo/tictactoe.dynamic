import { useEffect, useState } from 'react'
import { getBestMove } from 'src/lib/ai'
import { loadScore, saveScore } from 'src/lib/storage'

type Player = 'X' | 'O'
type Winner = Player | 'draw'
type CellValue = Player | null

export function useGame(
  mode: 'pvp' | 'pvc' | null,
  initialPlayer: Player,
  ruleSet: 'classic' | 'dynamic' = 'classic'
) {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<Player>(initialPlayer)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [score, setScore] = useState<Record<Winner, number>>({ X: 0, O: 0, draw: 0 })
  const [winCombo, setWinCombo] = useState<number[] | null>(null)

  const [movesX, setMovesX] = useState<number[]>([])
  const [movesO, setMovesO] = useState<number[]>([])

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]

  useEffect(() => {
    setScore(loadScore())
  }, [])

  const resetScore = () => {
    const initialScore = { X: 0, O: 0, draw: 0 }
    setScore(initialScore)
    saveScore(initialScore)
    reset()
  }

  function checkWinner(newBoard: CellValue[]): Winner | null {
    for (let combo of winningCombos) {
      const [a, b, c] = combo
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinCombo(combo)
        return newBoard[a] as Player
      }
    }
    return newBoard.every(cell => cell !== null) ? 'draw' : null
  }

  function play(index: number) {
    if (mode === null || board[index] || winner) return

    const updated = [...board]
    updated[index] = turn
    const result = checkWinner(updated)

    setBoard(updated)

    if (ruleSet === 'dynamic') {
      if (turn === 'X') {
        setMovesX(prev => [...prev, index])
      } else {
        setMovesO(prev => [...prev, index])
      }
    }

    if (result) {
      setWinner(result)
      setScore(prev => {
        const next = { ...prev }
        next[result]++
        saveScore(next)
        return next
      })
    } else {
      setTurn(turn === 'X' ? 'O' : 'X')
    }
  }

  // Movimento dinâmico: remove peça mais antiga se exceder 3
  useEffect(() => {
    if (ruleSet !== 'dynamic' || winner) return

    const currentMoves = turn === 'X' ? movesX : movesO
    const setCurrentMoves = turn === 'X' ? setMovesX : setMovesO

    if (currentMoves.length === 3) {
      const oldest = currentMoves[0]

      if (board[oldest] === turn) {
        setBoard(prev => {
          const next = [...prev]
          next[oldest] = null
          return next
        })
        setCurrentMoves(prev => prev.slice(1))
      } else {
        setCurrentMoves(prev => prev.slice(1))
      }
    }
  }, [turn, ruleSet, winner])

  useEffect(() => {
    if (mode === 'pvc' && turn !== initialPlayer && !winner) {
      const timeout = setTimeout(() => {
        const aiIndex = getBestMove(board, 'O', 'X')
        play(aiIndex)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [turn, board, winner, mode, initialPlayer])

  function reset() {
    setBoard(Array(9).fill(null))
    setTurn(initialPlayer)
    setWinner(null)
    setWinCombo(null)
    setMovesX([])
    setMovesO([])
  }

  return { board, play, reset, resetScore, turn, winner, score, winCombo }
}
