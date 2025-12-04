const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getEmployees } = require('../controllers/employeeController');

router.get('/api/employees', authenticate, getEmployees);

module.exports = router;
