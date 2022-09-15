const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt_decode = require('jwt-decode');

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  delete require.cache[require.resolve('./db.json')];
  let tasks = require('./db.json').tasks;
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    if(req.url == "/tasks" && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_decode(token);
      let newId = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1;
      req.body.userId = parseInt(decoded.sub);
      req.body.id = newId;
    }
  }
  if (req.method === 'PUT') {
    req.body.editedAt = Date.now();
    if(req.url.includes("/tasks") && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_decode(token);
      req.body.userId = parseInt(decoded.sub);
    }
  }
  if (req.method === 'GET') {
    // Self created middleware since the one from json-server-auth was not working properly
    // This part only sends tasks to the users they actually own
    if(req.url == "/tasks" && req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_decode(token);
      return res.send(tasks.filter(x => x.userId == parseInt(decoded.sub)));
    }
  }
  next();
});

server.db = router.db;

const rules = auth.rewriter({
  users: 600,
  tasks: 660,
});

server.use(rules);
server.use(auth);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
})