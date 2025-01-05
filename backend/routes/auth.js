const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const KAM = require('../models/KAM');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    if (KAM.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: KAM.length + 1,
        email,
        password: hashedPassword
      };
      KAM.push(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await KAM.findOne({
        where:{email}
    })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: "here" });
    }
  });

module.exports = router;