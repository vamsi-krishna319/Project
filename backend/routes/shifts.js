const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/auth');
const shiftController = require('../controllers/shiftController');

router.post('/api/shifts', authenticate, authorizeRole('admin'), shiftController.createShift);
router.get('/api/shifts', authenticate, shiftController.getShifts);
router.delete('/api/shift/:id', authenticate, authorizeRole('admin'), shiftController.deleteShift);

module.exports = router;
