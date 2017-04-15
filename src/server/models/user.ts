import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'

export interface UserAttributes {
  username: string
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes
}

type IUserModel = SequelizeStatic.Model<UserInstance, UserAttributes>

export default (sequelize: Sequelize): IUserModel => {
  const Schema = {
    username: {type: SequelizeStatic.STRING, allowNull: false, primaryKey: true},
  }
  const Options = {
    indexes:         [],
    classMethods:    {},
    timestamps:      false,
    freezeTableName: true,
  }
  return sequelize.define<UserInstance, UserAttributes>('User', Schema, Options)
}
