import * as SequelizeStatic from 'sequelize'
import {Instance, Sequelize} from 'sequelize'

export interface PostAttributes {
  userId: number
  id: number
  createdAt: Date
  // NOTE: updatedAt is not part of the Post interface
}

export interface PostInstance extends Instance<PostAttributes> {
  dataValues: PostAttributes
}

type IPostModel = SequelizeStatic.Model<PostInstance, PostAttributes>

export default (sequelize: Sequelize): IPostModel => {
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
    userId: {
      type:      SequelizeStatic.INTEGER,
      allowNull: false,
    },
  }
  const Post = sequelize.define<PostInstance, PostAttributes>('Post', Schema, {
    classMethods: {
      associate: (models: {User: IPostModel}) => Post.belongsTo(models.User),
    },
  })
  return Post
}
