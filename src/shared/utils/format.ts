// YYYY-MM-DD 날짜 -> YYYY.MM.DD 포맷팅
export function formatFullDateToKorean(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
export function formatFullDateToKorean2(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}T10:00:00`
}

// YYYY-MM-DDTHH:mm:ss -> YYYY.MM.DD HH:mm:ss
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
}

// 숫자 포맷 (3자리 콤마)
export const formatNumber = (value: number) =>
  value.toLocaleString('ko-KR', { maximumFractionDigits: 0 })

// 숫자 포맷에 끝에 '원' 을 추가해서 포맷
export const formatCurrency = (value: number): string => `${formatNumber(value)}원`
