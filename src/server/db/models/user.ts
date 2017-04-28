import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'
import {IPerson} from './person'

export interface UserAttributes extends IPerson {
  username: string
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes
}

type IUserModel = SequelizeStatic.Model<UserInstance, UserAttributes>

export default (sequelize: Sequelize): IUserModel => {
  const Schema = {
    username: {
      type:      SequelizeStatic.STRING,
      allowNull: false,
      unique:    true,
    },
  }
  return sequelize.define<UserInstance, UserAttributes>('User', Schema, {})
}
