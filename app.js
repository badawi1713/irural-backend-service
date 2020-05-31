const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const Admin = require('./routes/admin_routes');
const User = require('./routes/user_routes');
app.use('/api/v1/auth', Admin);
app.use('/api/v1/user', User);

app.listen(port, function () {
  console.log(`Server is Running on port ${port}`);
});
