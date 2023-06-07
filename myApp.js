let express = require('express');
let app = express();
const bodyParser = require('body-parser');

const static = express.static(__dirname + '/public');



app.use('/public', static);

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const indexPath = __dirname + '/views/index.html';
  res.sendFile(indexPath);
});

app.get('/json', (req, res) => {
  let message = 'Hello json';
  if ('uppercase' === process.env.MESSAGE_STYLE) {
    message = message.toUpperCase();
  }
  res.json({message: message});
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();  
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.route(
  '/name'
).get((req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
}).post((req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});































module.exports = app;
