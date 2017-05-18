import * as Nightmare from 'nightmare'
import config from './config'

const nightmare = () => <Nightmare>new Nightmare({
  show: !config.ci,
  waitTimeout: 10000,
})

export default nightmare
