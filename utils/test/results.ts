export const bodyMatches = (expected: any, status: number = 200) => (res: any) => {
  expect(res.body).toEqual(expected)
  expect(res.status).toEqual(status)
}
