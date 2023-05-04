const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJWT');
const { limiter, cacheMiddleware, saveToCache } = require('../middleware/bruteforcePreventation');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'teknofest'
};

const secretKey = 'mysecretkey';

// MySQL bağlantısını oluşturuyoruz
const connection = mysql.createConnection(dbConfig);

// MySQL bağlantısını açıyoruz
connection.connect(function(err) {
  if (err) throw err;
  console.log(`MySQL bağlantısı başarılı: ${dbConfig.host}`);
});

function getLogin(req, res) {
  // Kullanıcı daha önce login olduysa, doğrudan dashboard sayfasına yönlendir
  if (req.cookies.token) {
    return res.redirect('/dashboard');
  }

  res.render('site/index', { title: 'Giriş Yap' });
}

async function postLogin(req, res) {
  const { username, password } = req.body;

  try {
    const sql = `SELECT * FROM users WHERE username = ? LIMIT 1`;

    // bruteforce ve rate limit korumaları
    limiter(req, res, async function() {
      connection.query(sql, [username], async function(error, results) {
        if (error) {
          console.error(error);
          return res.render('site/index', { title: 'Giriş Yap', error: 'Bir hata oluştu.' });
        }

        if (results.length === 0) {
          const error = 'Kullanıcı adı veya şifre yanlış.';
          return res.render('site/index', { title: 'Giriş Yap', error: error });
        }

        const user = results[0];

        const result = await bcrypt.compare(password, user.password);

        if (result === true) {
          const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
          res.cookie('token', token, { httpOnly: true });
          res.redirect('/dashboard');
        } else {
          const error = 'Kullanıcı adı veya şifre yanlış.';
          return res.render('site/index', { title: 'Giriş Yap', error: error });
        }
      });
    });
  } catch (err) {
    console.error(err);
    return res.render('site/index', { title: 'Giriş Yap', error: 'Bir hata oluştu.' });
  }
}



function getDashboard(req, res) {
  res.render('site/dashboard', { username: req.decoded.username });
}



module.exports = {
  getLogin,
  postLogin,
  getDashboard: [verifyToken, getDashboard]
};