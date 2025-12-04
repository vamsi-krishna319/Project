const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

const User = require('./user')(sequelize);
const Employee = require('./employee')(sequelize);
const Shift = require('./shift')(sequelize);

// Associations
Employee.hasMany(Shift, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
Shift.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = {
  sequelize,
  User,
  Employee,
  Shift
};
