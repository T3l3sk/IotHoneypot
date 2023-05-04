const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';


function verifyToken(req, res, next) {
    // Token doğrulama
    const token = req.headers.cookie?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
    if (!token) {
      // Kullanıcı oturum açmamış, login sayfasına yönlendirme
      return res.redirect('/');
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          // Token süresi doldu, hata mesajı göster
          const error = 'Token süresi doldu, lütfen tekrar giriş yapın.';
          return res.render('site/index', { title: 'Giriş Yap', error: error });
        } else {
          // Token geçersiz, hata sayfası gösterme
          return res.status(401).json({ message: 'Invalid token' });
        }
      }
  
      // Token geçerli, devam et
      req.decoded = decoded;
      next();
    });
  }
  // Bu middleware tüm token'ları silecek şekilde yazılabilir.


  module.exports = verifyToken;