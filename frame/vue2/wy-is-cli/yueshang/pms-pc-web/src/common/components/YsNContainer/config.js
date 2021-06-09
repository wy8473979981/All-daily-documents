
import { getFullMonthRange } from 'utils/utils'

export const TransformQueryKeys = {
  'sv-ranking-headquarters': (data) => {
    const yearMonth = data.yearMonth;
    delete data.yearMonth
    if (yearMonth.length) {
      const [startDate, endDate] = getFullMonthRange(yearMonth)
      return { ...data, startDate, endDate }
    }
    return data
  }
}