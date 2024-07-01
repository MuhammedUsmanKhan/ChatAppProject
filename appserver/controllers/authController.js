import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
  
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: req.body.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
          httpOnly: true,
          secure: true // Set to true in production
        });
        console.log(token)
        res.send({
          message: 'Logged in successfully',
          data: {
            username: user.username,
            email: req.body.email
          }
        });

        return

      } else {
        res.status(400).json({ error: 'Invalid credentials' });
        return
      }
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
      return
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

