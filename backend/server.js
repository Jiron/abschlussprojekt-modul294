const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt_decode = require('jwt-decode');

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    if(req.url == "/tasks" && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_decode(token);
      req.body.userId = parseInt(decoded.sub);
    }
  }
  if (req.method === 'PUT') {
    req.body.editedAt = Date.now();
    if(req.url == "/tasks" && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_decode(token);
      req.body.userId = decoded.sub;
    }
  }
  next();
});

server.db = router.db;

const rules = auth.rewriter({
  users: 600,
  tasks: 600,
});

server.use(rules);
server.use(auth);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
})