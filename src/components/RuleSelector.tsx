// src/components/RuleSelector.tsx
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'

interface RuleSelectorProps {
  onSelect: (rule: 'classic' | 'dynamic') => void
}

export function RuleSelector({ onSelect }: RuleSelectorProps) {
  return (
    <Dialog open>
      <DialogContent className="max-w-xs w-full p-5">
        <DialogTitle className="text-lg font-semibold">Escolha o tipo de jogo</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Como deseja jogar?
        </DialogDescription>
        <div className="flex gap-4 mt-4 justify-center">
          <Button onClick={() => onSelect('classic')}>Clássico</Button>
          <Button onClick={() => onSelect('dynamic')}>Dinâmico</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
