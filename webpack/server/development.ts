import * as path from 'path'
import * as dotenv from 'dotenv'
import * as Env from '../models/Environment'
import {setup} from './'

dotenv.config({path: path.resolve('.env')})

export default setup(Env.Enum.development)
