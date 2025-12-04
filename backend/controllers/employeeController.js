const { Employee } = require('../models');

async function getEmployees(req, res) {
  const employees = await Employee.findAll({ order: [['name', 'ASC']] });
  res.json({ employees });
}

module.exports = { getEmployees };
