import * as Sequelize from 'sequelize'

import {models} from '../db'
import {IterationInstance} from '../db/models/iteration'
import {MockIterationService} from './iteration.mock'

const sequelizeFailure = (reject: Function) => (error: Sequelize.ValidationError) => {
  console.warn(error) // Log full error
  reject(error) // Return only the descriptive .errors array
  // reject(error.errors[0]) // Return only the descriptive .errors array
}

export class IterationService extends MockIterationService {
  all() {
    return new Promise<Array<IterationInstance>>((resolve: Function, reject: Function) => {
      return models.Iteration
        .findAll()
        .then((iterations: Array<IterationInstance>) => resolve(iterations))
        .catch(sequelizeFailure(reject))
    })
  }
}

export const iterationService = new IterationService