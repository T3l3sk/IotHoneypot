function clearTokens(req, res, next) {
    res.clearCookie('token');
    next();
  }
  
  module.exports = clearTokens