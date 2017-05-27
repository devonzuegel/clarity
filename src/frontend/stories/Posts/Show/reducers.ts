import {IterationSchema} from '~/server/db/models/iteration'
import {IState}          from './IState'


export const updatePostsList = (iterations: IterationSchema[]) => (prev: IState) => ({
  ...prev,
  iterations,
  selected: iterations.length - 1, // Last iteration
})

export const addIteration = (iteration: IterationSchema) => (prev: IState) => {
  const iterations = prev.iterations || []
  return {
    ...prev,
    iterations: [...iterations, iteration],
    selected:   iterations.length,
  }
}

export const select = (index: number, editing?: boolean) => (prev: IState) => ({
  ...prev,
  selected: index,
  editing,
})

export const toggle = (prev: IState) => ({
  ...prev,
  editing: !prev.editing,
})
