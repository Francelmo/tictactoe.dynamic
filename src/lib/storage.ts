export function loadScore() {
  if (typeof window === 'undefined') return { X: 0, O: 0, draw: 0 }
  return JSON.parse(localStorage.getItem('ttt-score') || '{"X":0,"O":0,"draw":0}')
}

export function saveScore(score: any) {
  if (typeof window === 'undefined') return
  localStorage.setItem('ttt-score', JSON.stringify(score))
}
