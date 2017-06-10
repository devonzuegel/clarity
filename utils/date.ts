export const formatDateStr = (s: string) => {
  const result = new Date(Date.parse(s)).toLocaleString('en-US', { hour12: false })
  if (result === 'Invalid Date') {
    throw Error(result)
  }
  return result
}
