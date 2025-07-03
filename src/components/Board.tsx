import { Cell } from './Cell'

type Player = 'X' | 'O'
type CellValue = Player | null

interface BoardProps {
  board: CellValue[]
  onPlay: (index: number) => void
  winCombo: number[] | null
}

export function Board({ board, onPlay, winCombo }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-[300px] h-[300px]">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onPlay(index)}
          isWinning={winCombo?.includes(index)}
        />
      ))}
    </div>
  )
}
