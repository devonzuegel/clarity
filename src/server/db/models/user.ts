import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'
import {IPerson} from './person'

export interface UserAttributes extends IPerson {
  username: string
  id: number
  createdAt: Date
  // NOTE: updatedAt is not part of the User interface
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes
}

export type IUserModel = SequelizeStatic.Model<UserInstance, UserAttributes>

export default (sequelize: Sequelize): IUserModel => {
  const Schema = {
    id: {
      allowNull:     false,
      autoIncrement: true,
      primaryKey:    true,
      type:          SequelizeStatic.INTEGER,
    },
    username: {
      allowNull: false,
      unique:    true,
      type:      SequelizeStatic.STRING,
    },
    createdAt: {
      allowNull: false,
      type:      SequelizeStatic.DATE,
    },
  }
  return sequelize.define<UserInstance, UserAttributes>('User', Schema, {})
}
