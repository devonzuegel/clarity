import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'
import {IUserModel} from './user'

export interface PostAttributes {
  userId: number
  createdAt?: Date
  // NOTE: updatedAt is not part of the Post interface
}

export interface PostSchema extends PostAttributes {
  id: number
}

export interface PostInstance extends Instance<PostAttributes> {
  dataValues: PostAttributes
}

export type IPostModel = SequelizeStatic.Model<PostInstance, PostAttributes>

export default (sequelize: Sequelize): IPostModel => {
  const Schema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: SequelizeStatic.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: SequelizeStatic.DATE,
    },
    userId: {
      type: SequelizeStatic.INTEGER,
      allowNull: false,
    },
  }
  const Post = sequelize.define<PostInstance, PostAttributes>('Post', Schema, {
    classMethods: {
      associate: (models: {User: IUserModel}) => Post.belongsTo(models.User),
    },
  })
  return Post
}
