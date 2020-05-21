const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const config = require('./src/Configs/Configs');
const routeNav = require('./src/index');
const port = config.port;

app.use(express.static('public'));

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routeNav);

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});

app.get('*', (request, response) => {
  response.sendStatus(404);
});

module.exports = app;
