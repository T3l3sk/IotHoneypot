const path = require('path')
const { engine } = require('express-handlebars');
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//routers
const dashboardRouter = require('./routes/dashboard.js');
const indexRouter = require('./routes/login.js');
const userRouter = require('./routes/user.js');
const quitRouter = require('./routes/quit.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 'true' değeri sadece HTTPS üzerinde çalışır.
}));

// Handlebars view engine'i ayarları
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');

const port = 3000

// Public klasörünü statik dosyalar için kullanımınıza açın
app.use(express.static(path.join(__dirname, 'public')));

//urlencoded için
app.use(bodyParser.urlencoded({ extended: true }));

//session kontrolü

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

//router tanıtma



app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/user', userRouter);
app.use('/quit',quitRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})