import {IterationSchema} from '~/server/db/models/iteration'

export interface IState {
  iterations?: IterationSchema[]
  selected: number
  editing: boolean
  loading: boolean
}
