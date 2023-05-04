const verifyToken = require('../middleware/verifyJWT');
const clearToken = require('../middleware/clearToken');

function quitFunction(req, res) {
    res.render('site/index');
}

module.exports={quitFunction:[clearToken,quitFunction]}
