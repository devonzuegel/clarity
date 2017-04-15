module.exports = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  env:  process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL,
}
