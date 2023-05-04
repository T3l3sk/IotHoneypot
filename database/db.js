const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = 'mongodb://localhost:27017';
const dbName = 'teknofest';
const usersCollectionName = 'users';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log(`MongoDB bağlantısı başarılı: ${url}`);
    const db = client.db(dbName);
    const usersCollection = db.collection(usersCollectionName);
    // Kullanıcı şifresini hashleyerek "users" koleksiyonuna ekliyoruz
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, function(err, hashedPassword) {
      if (err) throw err;
      const newUser = {
        username: user.username,
        password: hashedPassword
      };
      usersCollection.insertOne(newUser, function(err, res) {
        if (err) throw err;
        console.log('1 kullanıcı eklendi');
        client.close();
      });
    });
  })
  .catch((err) => {
    console.log('MongoDB bağlantısı başarısız', err);
  });

  var user = {
    username: "johndoe",
    password: "password123"
};

/*
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'teknofest'
};


const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
  if (err) throw err;
  console.log(`MySQL bağlantısı başarılı: ${dbConfig.host}`);
});

const saltRounds = 10;
const user = {
  username: "johndoe",
  password: "password123"
};

bcrypt.hash(user.password, saltRounds, function(err, hashedPassword) {
  if (err) throw err;
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  const values = [user.username, hashedPassword];
  connection.query(sql, values, function(error, results) {
    if (error) throw error;
    console.log('1 kullanıcı eklendi');
    connection.end();
  });
});*/
