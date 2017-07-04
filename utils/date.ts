import * as format from 'date-fns/format'

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
  return format(d, 'DD-MM-YYYY HH:mm:ss')
}

export const formatDateLong = (d: Date) => {
  return format(d, 'DD MMM YYYY, HH:mm')
}
