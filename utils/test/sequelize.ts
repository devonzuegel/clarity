import * as R from 'ramda'
import * as Sequelize from 'sequelize'

export const cleanup = (seq: Sequelize.Sequelize) => (cb: Function) => async (
  done: Function
) => {
  seq
    .transaction(async t => {
      await cb()
      return t.rollback()
    })
    .catch(e => {
      if (!R.equals(R.keys(e), [])) throw e
      done()
    })
}
