import { CircleQuestionMark } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'

interface InfoDialogProps {
  open: boolean
  onClose: () => void
}

export function InfoDialog({ open, onClose }: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleQuestionMark className="w-6 h-6" />
            Modo Dinâmico
          </DialogTitle>
          <DialogDescription className="mt-2">
            No modo <strong>dinâmico</strong>, se uma partida durar mais que três jogadas por jogador, a peça mais antiga daquele jogador é removida automaticamente do tabuleiro.
            <br />
            Isso torna o jogo mais estratégico e imprevisível!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
