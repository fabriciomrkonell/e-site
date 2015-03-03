'use strict';

var express         = require('express')
  , app             = express()
  , cors            = require('cors')
  , http            = require('http').Server(app)
  , bodyParser      = require('body-parser')
  , errorHandler    = require('errorhandler')
  , methodOverride  = require('method-override')
  , path            = require('path')
  , db              = require('./models')
  , passport        = require('passport')
  , flash           = require('connect-flash')
  , LocalStrategy   = require('passport-local').Strategy
  , swig            = require('swig')
  , route_passport  = require('./routes/passport')
  , user            = require('./routes/user')
  , login           = require('./routes/login')
  , promocao        = require('./routes/promocao')
  , produto         = require('./routes/produto')
  , departamento    = require('./routes/departamento')
  , loja            = require('./routes/loja')
  , banner          = require('./routes/banner')
  , site            = require('./routes/site')
  , curriculo       = require('./routes/curriculo')
  , index           = require('./routes/index')
  , configs         = require('./configs/config')
  , excel           = require('./configs/excel');

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'new-holand-project' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

function isAuthenticatedPage(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.send({ success: 2, message: 'Falha na autenticação!' });
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/admin');
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  route_passport.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      route_passport.findByEmail(username, password, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user == null) {
          return done(null, null);
        }
        return done(null, user);
      })
    });
  }
));

app.get('/', site.index);
app.get('/historia', site.history);
app.get('/lojas', site.stores);
app.get('/ofertas', site.sales);
app.get('/curriculo', site.curriculo);
app.get('/contato', site.contact);

app.post('/api/curriculo', curriculo.enviar)
app.post('/api/contact', site.enviar)

// API Get
app.get('/api/promocao', isAuthenticatedPage, promocao.getAll)
app.get('/api/promocao/:id', isAuthenticatedPage, promocao.getById)
app.get('/api/promocao/all/:id', isAuthenticatedPage, promocao.getAllById)
app.get('/api/loja', isAuthenticatedPage, loja.getAll)
app.get('/api/loja/:id', isAuthenticatedPage, loja.getById)
app.get('/api/departamento', isAuthenticatedPage, departamento.getAll)
app.get('/api/produto', isAuthenticatedPage, produto.getAll)
app.get('/api/produto/:id', isAuthenticatedPage, produto.getById)
app.get('/api/departamento/:id', isAuthenticatedPage, departamento.getById)
app.get('/api/banner', isAuthenticatedPage, banner.getAll)
app.get('/api/produtos/autocomplete/:exp', isAuthenticatedPage, produto.autocomplete)
app.get('/api/produtos/autocomplete/naofavorito/:exp', isAuthenticatedPage, produto.autocompleteNaoFavorito)
app.get('/api/produtos/favoritos', isAuthenticatedPage, produto.favoritos)
app.get('/api/user', isAuthenticatedPage, user.info)
app.get('/api/user/all', isAuthenticatedPage, user.getAll)
app.get('/api/curriculo', isAuthenticatedPage, curriculo.getAll)

// API Post
app.post('/api/promocao', isAuthenticatedPage, promocao.persist);
app.post('/api/banner', isAuthenticatedPage, banner.persist)
app.post('/api/loja', isAuthenticatedPage, loja.persist)
app.post('/api/departamento', isAuthenticatedPage, departamento.persist)
app.post('/api/user', isAuthenticatedPage, user.update)
app.post('/api/user/create', isAuthenticatedPage, user.salvar)
app.post('/api/user/password', isAuthenticatedPage, user.resetPassword)
app.post('/api/promocao/excel/:id', isAuthenticatedPage, excel.persist)
app.post('/api/produto', isAuthenticatedPage, produto.update)
app.post('/api/produtos/favoritos/:id', isAuthenticatedPage, produto.persistFavorito)
app.post('/api/promocao/produto', isAuthenticated, promocao.adicionarProduto)

app.post('/api/imagem/banner/:id', isAuthenticatedPage, function(req, res, next){
  banner.setImagem(req, res, next, __dirname);
});

app.post('/api/imagem/loja/:id', isAuthenticatedPage, function(req, res, next){
  loja.setImagem(req, res, next, __dirname);
});

app.post('/api/imagem/produto/:id', isAuthenticatedPage, function(req, res, next){
  produto.setImagem(req, res, next, __dirname);
});

// API Delete
app.delete('/api/produto/:id', isAuthenticatedPage, produto.excluir);
app.delete('/api/promocao/:id', isAuthenticatedPage, promocao.excluir);
app.delete('/api/banner/:id', isAuthenticatedPage, banner.excluir);
app.delete('/api/user/:id', isAuthenticatedPage, user.excluir);
app.delete('/api/promocao/produto/:id', isAuthenticatedPage, promocao.excluirProduto);

// Configurações
/*app.get('/init', function(req, res, next){
  configs.config(req, res, next, __dirname);
});*/

// Rotas
app.get('/admin', function(req, res, next){
  res.sendfile('public/views/index/index.html');
});

app.get('/admin/home', isAuthenticated, function(req, res, next){
  res.sendfile('public/views/default/index.html');
});

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

app.get('/views/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/index.html');
});

app.get('/views/persist/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/persist/index.html');
});

app.get('/views/edit/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/edit/index.html');
});

app.get('/views/favorito/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/favorito/index.html');
});

app.get('/views/password/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/password/index.html');
});

app.get('/views/excel/:page', isAuthenticatedPage, function(req, res, next){
  res.sendfile('public/views/' + req.param('page').split("!")[0] + '/excel/index.html');
});

app.get('/user', isAuthenticatedPage, function(req, res, next){
  res.json({
    name: req.user.name,
    email: req.user.email
  });
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
  }), function(req, res, next) {
    res.json({ success: 1})
});

db.sequelize.sync({ force: false }).complete(function(err) {
  if (err) {
    throw err
  } else {
    user.init();
    http.listen(app.get('port'), function(){
      console.log('NodeJS em ' + app.get('port'))
    });
  }
});