module.exports = (app, express) => {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/../public'));
  // app.use(express.static(__dirname + '/../../bower_components'));
};
