export interface ReportResponse {
  totalSales: number
  successCnt: number
  failedCnt: number
  successRate: number
  ageDistribution: {
    over10: number
    over20: number
    over30: number
    over40: number
    over50: number
    over60: number
  }
  genderDistribution: {
    maleCnt: number
    femaleCnt: number
  }
}
