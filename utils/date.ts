import * as moment from 'moment'

export const formatDateStr = (s: string) => {
  const result = new Date(Date.parse(s)).toLocaleTimeString('en-UK', {
    hour12: false,
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  })
  if (result === 'Invalid Date') {
    throw Error(result)
  }
  return result
}

export const formatDate = (d: Date) => {
  return moment(d).format('DD-MM-YYYY HH:mm:ss')
}
