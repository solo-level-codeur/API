const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/note', indexRouter);


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
