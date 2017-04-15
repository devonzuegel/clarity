export interface DatabaseConfig {
  username: string
  password: string
  database: string
  host:     string
  port:     number
  dialect:  string
  timezone: string
}

const config: DatabaseConfig = {
  username: 'devonzuegel',
  password: 'password',
  database: 'clarity_test',
  host:     'localhost',
  port:     5432,
  dialect:  'postgres',
  timezone: '+00:00',
}

export default config
