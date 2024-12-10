import bcrypt from 'bcryptjs';
import User from '../../models/User'; // Ensure path to your model is correct
import dbConnect from '../../lib/dbConnect'; // Ensure path to your DB connection logic is correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;

    // Validate the input
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
      console.log('Connecting to database...');  // Log the DB connection attempt
      await dbConnect(); // Ensure that the database is connected

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });

      await newUser.save();
      console.log('User registered successfully:', newUser);  // Log the created user

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during registration:', error);  // Log the error
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
