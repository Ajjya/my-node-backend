const redis = require('common/redis');
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded);
    });
  });
};


exports.AuthRequired = () => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(401).json({
        error: 'Unauthorized',
        code: 'api/unauthorized'
      });
      return;
    }

    const token = req.headers.authorization.replace(/Bearer\s+/, '');

    try {
      let decoded = null;

      try {
        decoded = await verifyToken(token);
      } catch(err) {
        res.status(401).json({
          error: 'Unauthorized',
          code: err.name == 'TokenExpiredError' ? 'auth/token-expired' : 'auth/token-not-valid'
        });
        return;
      }

      //verified OK
      if (decoded.id) {
        let sess = await redis.cmd('GET', 'sess_' + decoded.sid);

        if (sess) {
          //if sess in Redis just use it
          sess = JSON.parse(sess);
        } else {
            sess = await db.sessions.findOne({
              where: {
                id: decoded.sid
              }
            });

            if (sess) {
              await redis.cmd('SET', 'sess_' + sess.id, JSON.stringify(sess));
            }
        }

        if (!sess || sess.is_active !== 'yes') {
          res.status(401).json({
            error: 'Unauthorized',
            code: 'auth/session-expired'
          });
          return;
        }

        const user = await db.users.findOne({
          attributes: { exclude: ['password'] },
          where: {
            id: decoded.id
          }
        });

        if (!user || user.is_active !== 'yes') {
          res.status(401).json({
            error: 'Unauthorized',
            code: 'auth/user-not-found'
          });
          return;
        }
      }

      res.status(401).json({
        error: 'Unauthorized',
        code: 'api/unauthorized'
      });
      return;
    } catch(e) {
      next(e);
    }
  }
}