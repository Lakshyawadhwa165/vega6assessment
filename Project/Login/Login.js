const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../Database/Database.js');

exports.register = (req, res) => {
  const { email, password } = req.body;
  const profileImage = req.file?.filename;

  bcrypt.hash(password, 10, (err, hash) => {
    db.query(
      'INSERT INTO users (email, password, profileImage) VALUES (?, ?, ?)',
      [email, hash, profileImage],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ msg: 'User registered' });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ msg: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ msg: 'Invalid credentials' });
      }
    });
  });
};
