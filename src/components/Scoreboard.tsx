interface ScoreboardProps {
  score: {
    X: number
    O: number
    draw: number
  }
}

export function Scoreboard({ score }: ScoreboardProps) {
  return (
    <div className="flex justify-around w-72 mb-4 text-lg font-medium">
      <div>X: {score.X}</div>
      <div>O: {score.O}</div>
      <div>Empates: {score.draw}</div>
    </div>
  )
}
