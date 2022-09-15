const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  if (req.method === 'PUT') {
    req.body.editedAt = Date.now();
  }
  next();
});

server.db = router.db;

const rules = auth.rewriter({
  users: 600,
  tasks: 440,
});

server.use(rules);
server.use(auth);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
})