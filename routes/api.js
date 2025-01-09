const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/requestValidator');

router.post('/submit', validateRequest, (req, res) => {
    res.status(200).json({ message: 'Request processed successfully' });
});

module.exports = router; 