/** 진행률(0~100) 클램프 */
export function clampPercent(value?: number): number | undefined {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined
  return Math.max(0, Math.min(100, Math.round(value)))
}

/** 남은 일수 계산 (endAt 기준). 없으면 undefined */
export function getDaysLeft(endAt?: string): number | undefined {
  if (!endAt) return undefined
  const end = new Date(endAt).setHours(0, 0, 0, 0)
  const now = new Date().setHours(0, 0, 0, 0)
  // 음수일 때 0으로 처리(마감)
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)))
}

/** 마감 배지 텍스트 & 긴급여부 */
export function getDeadlineInfo(endAt?: string): { text: string; urgent: boolean } {
  const days = getDaysLeft(endAt)
  if (typeof days === 'undefined') return { text: '', urgent: false }
  if (days <= 3) return { text: '마감임박', urgent: true }
  return { text: `${days}일 남음`, urgent: false }
}
