import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'
import {IPostModel} from './post'

export interface IterationAttributes {
  postId: number
  id: number
  createdAt: Date
  body: string
  title: string
  // NOTE: updatedAt is not part of the Iteration interface
}

export interface IterationInstance extends Instance<IterationAttributes> {
  dataValues: IterationAttributes
}

type IIterationModel = SequelizeStatic.Model<IterationInstance, IterationAttributes>

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
      type: SequelizeStatic.STRING,
    },
  }
  const Iteration = sequelize.define<IterationInstance, IterationAttributes>('Iteration', Schema, {
    classMethods: {
      associate: (models: {Post: IPostModel}) => Iteration.belongsTo(models.Post),
    },
  })
  return Iteration
}
