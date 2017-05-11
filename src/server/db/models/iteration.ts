import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'
import {IPostModel} from './post'

export interface IterationAttributes {
  postId: number
  body?:  string
  title:  string
}

export interface IterationInstance extends Instance<IterationAttributes> {
  dataValues: IterationAttributes
}

export type IIterationModel = SequelizeStatic.Model<IterationInstance, IterationAttributes>

export default (sequelize: Sequelize): IIterationModel => {
  const Schema = {
    id: {
      allowNull:     false,
      autoIncrement: true,
      primaryKey:    true,
      type:          SequelizeStatic.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type:      SequelizeStatic.DATE,
    },
    postId: {
      type:      SequelizeStatic.INTEGER,
      allowNull: false,
    },
    body: {
      type: SequelizeStatic.TEXT,
    },
    title: {
      type:      SequelizeStatic.STRING,
      allowNull: false,
    },
  }
  const Iteration = sequelize.define<IterationInstance, IterationAttributes>('Iteration', Schema, {
    classMethods: {
      associate: (models: {Post: IPostModel}) => Iteration.belongsTo(models.Post),
    },
  })
  return Iteration
}