const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const employeeRoutes = require('./employees');
const shiftRoutes = require('./shifts');

router.use(authRoutes);
router.use(employeeRoutes);
router.use(shiftRoutes);

module.exports = router;
