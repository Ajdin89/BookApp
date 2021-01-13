import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied', success: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid', success: false });
  }
};
