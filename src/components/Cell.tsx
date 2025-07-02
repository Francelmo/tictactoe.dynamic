import { cn } from 'src/lib/utils'

type Player = 'X' | 'O'
type CellValue = Player | null

interface CellProps {
  value: CellValue
  onClick: () => void
  isWinning?: boolean
}

export function Cell({ value, onClick, isWinning }: CellProps) {
  return (
    <button
      className={`aspect-square w-full flex items-center justify-center text-5xl font-bold border rounded-sm
        ${isWinning ? 'bg-green-200 dark:bg-green-700' : 'hover:bg-muted'} transition`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
