import * as express from 'express';
import * as chalk   from 'chalk';

const app  = express();
const port = 4000;
const host = 'localhost';

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello world');
});

console.info(chalk.black.bgGreen(`\n\nListening at http://${host}:${port}\n`));
app.listen(port);

