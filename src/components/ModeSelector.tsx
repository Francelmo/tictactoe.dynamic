import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "src/components/ui/dialog"
import { Button } from "src/components/ui/button"

interface ModeSelectorProps {
  onSelectMode: (mode: 'pvp' | 'pvc') => void
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <Dialog open={true}>
    <DialogContent className="max-w-xs w-full p-5">
        <DialogTitle className="text-lg font-semibold">Escolha o modo</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
            Selecione contra quem você quer jogar
        </DialogDescription>
        <div className="flex gap-4 mt-4 justify-center items-center">
            <Button onClick={() => onSelectMode('pvp')}>1 x 1</Button>
            <Button onClick={() => onSelectMode('pvc')}>1 x COM</Button>
        </div>
    </DialogContent>
    </Dialog>

  )
}
