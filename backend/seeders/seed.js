require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User, Employee } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });

  // create some employees
  const emp1 = await Employee.create({ name: 'Vamsi Krishna', employeeCode: 'EMP001', department: 'Engineering' });
  const emp2 = await Employee.create({ name: 'Anshuman Demo', employeeCode: 'EMP002', department: 'HR' });

  // hash passwords
  const adminPass = await bcrypt.hash('Admin@2025!', 10);
  const userPass = await bcrypt.hash('User@2025!', 10);
  const demoPass = await bcrypt.hash('HireMe@2025!', 10); // required demo password

  // create users
  await User.create({ email: 'admin@company.com', password: adminPass, role: 'admin', employeeId: emp1.id });
  await User.create({ email: 'user@company.com', password: userPass, role: 'user', employeeId: emp2.id });

  // required demo login (must exist in hosted deployment)
  await User.create({ email: 'hire-me@anshumat.org', password: demoPass, role: 'admin', employeeId: emp1.id });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
