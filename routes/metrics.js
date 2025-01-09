const express = require('express');
const router = express.Router();
const monitoringService = require('../services/monitoringService');

router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, ip } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                error: 'startDate and endDate are required query parameters',
            });
        }

        const metrics = await monitoringService.getMetrics(
            new Date(startDate),
            new Date(endDate),
            ip
        );

        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching metrics' });
    }
});

module.exports = router; 