export const bodyMatches = (expected: any) => (res: any) => {
  expect(res.body).toEqual(expected)
}
