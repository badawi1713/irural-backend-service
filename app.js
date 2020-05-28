const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const routerAdmin = require('./routes/routerAdmin');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/admin', routerAdmin);

module.exports = app;
app.listen(PORT, () => {
  console.log('Listeng on port ' + PORT);
});
