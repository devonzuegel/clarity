import * as cls       from 'continuation-local-storage'
import * as Sequelize from 'sequelize'

import UserModel      from '../db/models/user'
import PostModel      from '../db/models/post'
import IterationModel from '../db/models/iteration'

import c from './config'
const database_url = require('../config.js').database_url

interface IModels {
  User:      any, // TODO: IUserModel,
  Post:      any, // TODO: IPostModel,
  Iteration: any, // TODO: IIterationModel,
}

class Database {
  /** Models supported by our DB. */
  private models: IModels

  /** Instance of our Sequelize connection. */
  private sequelize: Sequelize.Sequelize

  constructor() {
    (Sequelize as any).cls = cls.createNamespace('sequelize-transaction')
    if (database_url) {
      this.sequelize = new Sequelize(database_url, c)
    } else {
      this.sequelize = new Sequelize(c.database, c.username, c.password, c)
    }
    this.models = {
      User:      UserModel(this.sequelize),
      Post:      PostModel(this.sequelize),
      Iteration: IterationModel(this.sequelize),
    }
  }

  getModels    = () => this.models
  getSequelize = () => this.sequelize
}

const database = new Database()

export const models    = database.getModels()
export const sequelize = database.getSequelize()
