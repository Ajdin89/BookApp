import { Router } from 'express';
import bcrypt from 'bcryptjs';
import config from '../../config';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = config;
const router = Router();
const user = {
  email: 'test',
  password: 'pass123',
};

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const isValidEmail = email === user.email;
    if (!isValidEmail)
      res.status(400).json({ msg: 'E-mail is invalid', success: false });

    const isMatch = password === user.password;
    if (!isMatch)
      res.status(400).json({ msg: 'Invalid password', success: false });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token)
      res.status(400).json({ msg: 'Couldnt sign a token', success: false });

    res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;
