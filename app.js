const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/routerAdmin');

const PORT = 3002;

const app = express();

app.use(bodyParser.json());

app.use('/', adminRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Welcome',
  });
});

app.listen(PORT, () => {
  console.log(`Application Running at port ${PORT}`);
});
