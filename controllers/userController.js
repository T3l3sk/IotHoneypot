const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJWT');
const tokenClear = require('../middleware/clearToken.js');

function getUse(req, res) {
  res.render('site/user', { username: req.decoded.username, password: req.decoded.password });
}

  
function getDashboard(req, res) {
    res.render('site/dashboard', { username: req.decoded.username });
  }
  function getQuit(req, res) {
    console.log(res.clearCookie('token'))

    res.clearCookie('token');
    res.render('site/index');
  }
  module.exports = {
    getUse: [verifyToken, getUse],
    getDashboard: [verifyToken, getDashboard],
    getQuit: [tokenClear,getQuit]
    }