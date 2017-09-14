import * as cls from 'continuation-local-storage'
import * as Sequelize from 'sequelize'

import UserModel, {IUserModel} from '~/server/db/models/user'
import PostModel, {IPostModel} from '~/server/db/models/post'
import IterationModel, {IIterationModel} from '~/server/db/models/iteration'

import c from '~/server/db/config'
import config from '~/server/config/index.typed'
// const database_url = require('../config/index.js').database_url

interface IModels {
  User: IUserModel
  Post: IPostModel
  Iteration: IIterationModel
}

class Database {
  /** Models supported by our DB. */
  private models: IModels

  /** Instance of our Sequelize connection. */
  private sequelize: Sequelize.Sequelize

  constructor() {
    const _Sequelize = Sequelize as any
    _Sequelize.cls = cls.createNamespace('sequelize-transaction')

    this.sequelize = new _Sequelize(config.database_url, c)

    this.models = {
      User: UserModel(this.sequelize),
      Post: PostModel(this.sequelize),
      Iteration: IterationModel(this.sequelize),
    }
  }

  getModels = () => this.models
  getSequelize = () => this.sequelize
}

const database = new Database()

export const models = database.getModels()
export const sequelize = database.getSequelize()
