const verifyToken = require('../middleware/verifyJWT');

function getUse(req, res) {
    res.render('site/user', { username: req.decoded.username });
}

function getDashboard(req, res) {
    res.render('site/dashboard', { username: req.decoded.username });
}

module.exports = {
  getUse: [verifyToken, getUse],
  getDashboard: [verifyToken, getDashboard]
};
