// /pages/api/login.js

import jwt from 'jsonwebtoken';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    // Set cookie
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
