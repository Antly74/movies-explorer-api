module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const { allowedCors = 'http://localhost:3000' } = process.env;

  if (allowedCors.split(',').includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    res.end();
  } else {
    next();
  }
};
