export type StrObject = { [key: string]: string }

export function strEnum<T extends string>(obj: Array<T>): {[K in T]: K} {
  return obj.reduce((soFar, key) => ({ ...soFar, key }), Object.create(null))
}
