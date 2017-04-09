import * as U from '../../utils/models'

export const Enum = U.strEnum([
  'cheap-module-eval-source-map',
  'cheap-module-source-map',
])

export type Type = keyof typeof Enum
