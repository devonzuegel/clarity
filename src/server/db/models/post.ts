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
    userId: {
      allowNull: false,
      type: SequelizeStatic.INTEGER,
    },
    slug: {
      allowNull: false,
      defaultValue: SequelizeStatic.UUIDV4,
      type: SequelizeStatic.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: SequelizeStatic.DATE,
    },
  }
  const Post = sequelize.define<PostInstance, PostAttributes>('Post', Schema, {
    classMethods: {
      associate: (models: {User: IUserModel}) => Post.belongsTo(models.User),
    },
  })
  return Post
}
