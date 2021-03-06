import {IterationSchema} from '~/server/db/models/iteration'

export interface IState {
  iterations?: IterationSchema[]
  selected: number | number[]
  editing: boolean
  loading: boolean
}
