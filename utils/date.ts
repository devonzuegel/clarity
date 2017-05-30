export const formatDateStr = (s: string) => {
  const result = new Date(Date.parse(s)).toLocaleString()
  if (result === 'Invalid Date') {
    throw Error(result)
  }
  return result
}
