const NodeCache = require('node-cache');

// 5 dakika sonra önbellekten silinsin
const cache = new NodeCache({ stdTTL: 300, checkperiod: 310 });

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 dakika
    max: 5, // en fazla 5 istek
    keyGenerator: function(req) {
      return req.ip + ':' + req.body.username; // Kullanıcı adı ve IP adresini birleştirerek anahtar oluşturun
    },
    handler: function(req, res, next) {
      const remainingTimeMs = req.rateLimit.resetTime - Date.now();
      const remainingTime = Math.ceil(remainingTimeMs / 1000 / 60);
      const errorText = `Çok fazla deneme yaptınız. Lütfen ${remainingTime} dakika sonra tekrar deneyin.`;
      res.status(429).send(errorText);
    }
  });
  
  

// Önbellek kontrolü
const cacheMiddleware = function(req, res, next) {
    const cacheKey = req.ip;
    const cachedData = cache.get(cacheKey);
  
    if (cachedData) {
      const remainingTimeMs = cache.getTtl(cacheKey) - Date.now();
      const remainingTime = Math.ceil(remainingTimeMs / 1000 / 60);
      const errorText = `Çok fazla deneme yaptınız. Lütfen ${remainingTime} dakika sonra tekrar deneyin.`;
      res.status(429).send(errorText);
    } else {
      next();
    }
  };
  



module.exports = { limiter, cacheMiddleware };
