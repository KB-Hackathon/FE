function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const toAlpha = (hex: string) => {
  const alpha = 0.7 + Math.random() * 0.3
  return hexToRgba(hex, parseFloat(alpha.toFixed(2)))
}

export const baseColors = ['#ffbb00', '#b3a99e', '#ffcc00', '#8c7b70', '#ffd966', '#60584c']
