const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/keys');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('connected to ' + config.database)
});

mongoose.connection.on('error', (err) => {
  console.log('Connected error: ' + err)
});

const app = express();
const users = require('./routes/users');

const PORT = 4321;
require('./config/passport')(passport);

app
  .use(bodyParser.json())
  .use('/users', users)
  .use(passport.initialize())
  .use(passport.session())

  .get('/', (req, res) => {
  res.send('Welcome');
})


.listen(PORT, () => {
  console.log('Node server listening on port '+ PORT);
  console.log(process.pid);
});
