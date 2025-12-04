const { Shift, Employee } = require('../models');
const { Op } = require('sequelize');

// helper: convert DATE + TIME to minutes since midnight
function timeToMinutes(timeStr) {
  // timeStr format "HH:MM:SS" or "HH:MM"
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh * 60 + (mm || 0);
}

function durationMinutes(startTime, endTime) {
  const s = timeToMinutes(startTime);
  const e = timeToMinutes(endTime);
  // assume end >= start on same day; if end < start treat as invalid (we'll reject)
  return e - s;
}

// Business rule: overlap test
async function hasOverlap(employeeId, date, startTime, endTime) {
  // find shifts for employee on that date
  const shifts = await Shift.findAll({
    where: { employeeId, date }
  });

  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  for (const s of shifts) {
    const existingStart = timeToMinutes(s.startTime);
    const existingEnd = timeToMinutes(s.endTime);
    // overlap if newStart < existingEnd && newEnd > existingStart
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
}

async function createShift(req, res) {
  try {
    const { employeeId, date, startTime, endTime } = req.body;
    if (!employeeId || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'employeeId, date, startTime, endTime required' });
    }

    // verify employee exists
    const emp = await Employee.findByPk(employeeId);
    if (!emp) return res.status(400).json({ error: 'Employee not found' });

    // validate times
    const dur = durationMinutes(startTime, endTime);
    if (isNaN(dur) || dur <= 0) {
      return res.status(400).json({ error: 'Invalid times (end must be after start on same date)' });
    }
    if (dur < 4 * 60) {
      return res.status(400).json({ error: 'Shift must be at least 4 hours' });
    }

    // overlap check
    const overlap = await hasOverlap(employeeId, date, startTime, endTime);
    if (overlap) return res.status(400).json({ error: 'Shift overlaps with existing shift for this employee on the same date' });

    const shift = await Shift.create({ employeeId, date, startTime, endTime });
    return res.status(201).json({ shift });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function getShifts(req, res) {
  try {
    const { employee: employeeQuery, date } = req.query;
    const user = req.user;

    const where = {};
    if (date) where.date = date;

    // If normal user: force employee=own employeeId
    if (user.role === 'user') {
      if (!user.employeeId) return res.status(400).json({ error: 'User not linked to an employee record' });
      where.employeeId = user.employeeId;
    } else {
      // admin: allow optional filter
      if (employeeQuery) where.employeeId = employeeQuery;
    }

    const shifts = await Shift.findAll({
      where,
      include: [{ model: Employee, attributes: ['id', 'name', 'employeeCode', 'department'] }],
      order: [['date', 'ASC'], ['startTime', 'ASC']]
    });

    return res.json({ shifts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function deleteShift(req, res) {
  try {
    const id = req.params.id;
    const shift = await Shift.findByPk(id);
    if (!shift) return res.status(404).json({ error: 'Shift not found' });
    await shift.destroy();
    return res.json({ message: 'Shift deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createShift, getShifts, deleteShift };
