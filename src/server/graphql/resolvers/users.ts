const {resolver} = require('graphql-sequelize')

import {models} from '~/server/db'

export default resolver(models.User)
