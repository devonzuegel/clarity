import * as express from 'express'

const app = express()

app.get('/', (req, res) => res.send('page'))

console.log("Listening on port 4000...")
app.listen(4000)

