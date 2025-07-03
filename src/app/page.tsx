'use client'

import { useState, useEffect } from 'react'
import { ModeSelector } from 'src/components/ModeSelector'
import { RuleSelector } from 'src/components/RuleSelector'
import { Board } from 'src/components/Board'
import { Scoreboard } from 'src/components/Scoreboard'
import { GameControls } from 'src/components/GameControls'
import { useGame } from 'src/hooks/useGame'
import { Button } from 'src/components/ui/button'
import { SettingsDialog } from 'src/components/SettingsDialog'
import { SettingsIcon } from 'src/components/ui/icons/SettingsIcon'
import { InfoDialog } from 'src/components/InfoDialog'
import { CircleQuestionMark } from 'lucide-react'

type Player = 'X' | 'O'

export default function Home() {
  const [ruleSet, setRuleSet] = useState<'classic' | 'dynamic' | null>(null)
  const [mode, setMode] = useState<'pvp' | 'pvc' | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const game = useGame(mode, player ?? 'X', ruleSet ?? 'classic')

  useEffect(() => {
    game.reset()
  }, [mode, player, ruleSet])

  useEffect(() => {
    if (ruleSet === 'dynamic' && mode && !player) {
      setIsInfoOpen(true)
    }
  }, [ruleSet, mode, player])

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <main className="flex min-h-screen w-full bg-background text-foreground">
      {/* Espaço lateral para futuras ads */}
      <aside className="hidden lg:block w-32" />

      {/* Conteúdo central */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 relative">
        {/* Botões no canto superior direito */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" className="w-12 h-12 p-3" onClick={() => setIsInfoOpen(true)}>
            <CircleQuestionMark className="w-6 h-6 text-foreground" />
          </Button>
          <Button variant="ghost" className="w-12 h-12 p-3" onClick={() => setIsSettingsOpen(true)}>
            <SettingsIcon className="w-8 h-8 text-foreground" />
          </Button>
        </div>

        {/* Modais */}
        <SettingsDialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onToggleTheme={handleToggleTheme}
          onResetScore={game.resetScore}
        />
        <InfoDialog open={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

        {/* Etapa 0: Seleção de regra */}
        {!ruleSet && <RuleSelector onSelect={setRuleSet} />}

        {/* Etapa 1: Seleção do modo */}
        {ruleSet && !mode && <ModeSelector onSelectMode={setMode} />}

        {/* Etapa 2: Seleção do símbolo */}
        {ruleSet && mode && !player && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Escolha seu símbolo</h2>
            <div className="flex gap-4">
              <Button onClick={() => setPlayer('X')}>X</Button>
              <Button onClick={() => setPlayer('O')}>O</Button>
            </div>
          </div>
        )}

        {/* Etapa 3: Jogo */}
        {ruleSet && mode && player && (
          <>
            <Scoreboard score={game.score} />
            <Board board={game.board} onPlay={game.play} winCombo={game.winCombo} />
            <p className="mt-4 h-6 text-xl">
              {game.winner && (game.winner === 'draw' ? 'Empate!' : `Venceu: ${game.winner}`)}
            </p>
            <div className="flex gap-4 mt-4">
              {game.winner && <Button onClick={game.reset}>Jogar de novo</Button>}
              <GameControls
                onReset={game.reset}
                onBack={() => {
                  setRuleSet(null)
                  setMode(null)
                  setPlayer(null)
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Espaço lateral para futuras ads */}
      <aside className="hidden lg:block w-32" />
    </main>
  )
}
