const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Shift', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    employeeId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'shifts',
    timestamps: true
  });
};
