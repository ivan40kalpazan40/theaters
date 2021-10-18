const express = require('express');
const path = require('path');
const router = require('./router');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');
const hbsInit = require('./config/handlebars');
const initDb = require('./config/db');
const { connectionString, PORT } = require('./config/constants');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
hbsInit(app);
app.use(auth);
app.use(router);

initDb(connectionString)
  .then(() => {
    console.log('Connected to DB');
  })
  .then(() => {
    app.listen(
      PORT,
      console.log.bind(console, `Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
