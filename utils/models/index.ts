export type StrObject = { [key: string]: string }

// Adopted from:
//   https://basarat.gitbooks.io/typescript/docs/types/literal-types.html
export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}
