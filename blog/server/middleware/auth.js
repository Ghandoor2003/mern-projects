import jwt from 'jsonwebtoken';

const secret = 'asdfe45we45w345wegw345werjktjwertkj';

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  });
};
