import { Product } from '@/entities/product/product.entity'

/** 첫 번째 미디어(커버 이미지) */
export function getCover(product: Product): string {
  return product?.media?.[0] ?? ''
}

/** 진행률(0~100) 클램프 */
export function clampPercent(value?: number): number | undefined {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined
  return Math.max(0, Math.min(100, Math.round(value)))
}

/** 카드 상단의 "35% 달성 중이에요" 텍스트 */
export function getProgressText(product: Product): string {
  const pct = clampPercent(product.groupBuying?.progressPct)
  return typeof pct === 'number' ? `${pct}% 달성` : ''
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
