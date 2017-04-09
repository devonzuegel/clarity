import * as express from 'express'

const app = express()

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello world')
})

console.log("Listening on port 4000...")
app.listen(4000)

