import * as U from '../../utils/models'

export const Enum = U.strEnum([
  'development',
  'production',
])

export type Type = keyof typeof Enum
