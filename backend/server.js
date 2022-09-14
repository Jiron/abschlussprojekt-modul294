const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
var request = require('request');

server.use(middlewares);

server.delete('/test', (req, res) => {
    console.log(req.body);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
      // request.get(
      //   'http://localhost:3000/tasks',
      //   { json: { key: 'value' } },
      //   function (error, response, body) {
      //       if (!error && response.statusCode == 200) {
      //           console.log(body);
      //       }
      //   }
    // );
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
})