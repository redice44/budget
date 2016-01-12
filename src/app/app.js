const express = require('express');
const app = express();
const appConfig = require('./config/appMain');
const appRoutes = require('./routes/index');

appConfig(app, express);
appRoutes(app);

app.listen(3000, () => {
  console.log('Express Server listening on port: 3000');
});
