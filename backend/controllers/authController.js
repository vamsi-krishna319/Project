const { User, Employee } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = await User.findOne({ where: { email }, include: Employee });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'invalid credentials' });

  const payload = { id: user.id, role: user.role, employeeId: user.employeeId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

  res.json({ token, user: { id: user.id, email: user.email, role: user.role, employeeId: user.employeeId }});
}

module.exports = { login };
