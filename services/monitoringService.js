const RequestLog = require('../models/RequestLog');
const Alert = require('../models/Alert');
const emailService = require('./emailService');
const config = require('../config/config');
const cacheService = require('./cacheService');

class MonitoringService {
    async logFailedRequest(ip, failureReason, headers, endpoint) {
        try {
            const log = new RequestLog({
                ip,
                failureReason,
                headers,
                endpoint,
            });
            await log.save();

            await this.checkThresholdAndAlert(ip);
        } catch (error) {
            console.error('Error logging failed request:', error);
        }
    }

    async checkThresholdAndAlert(ip) {
        const timeWindow = config.monitoring.timeWindowMinutes;
        const threshold = config.monitoring.failureThreshold;
        const windowStart = new Date(Date.now() - timeWindow * 60 * 1000);

        try {
            const failedAttempts = await RequestLog.countDocuments({
                ip,
                timestamp: { $gte: windowStart },
            });

            if (failedAttempts >= threshold) {
                const existingAlert = await Alert.findOne({
                    ip,
                    firstFailure: { $gte: windowStart },
                    notificationSent: true,
                });

                if (!existingAlert) {
                    const alert = new Alert({
                        ip,
                        failedAttempts,
                        firstFailure: windowStart,
                        lastFailure: new Date(),
                        notificationSent: true,
                        notificationTime: new Date(),
                    });
                    await alert.save();

                    await emailService.sendAlert(ip, failedAttempts, timeWindow);
                }
            }
        } catch (error) {
            console.error('Error checking threshold and sending alert:', error);
        }
    }

    async getMetrics(startDate, endDate, ip = null) {
        const cacheKey = `metrics:${startDate}:${endDate}:${ip || 'all'}`;

        // Try to get from cache first
        const cachedMetrics = cacheService.get(cacheKey);
        if (cachedMetrics) {
            return cachedMetrics;
        }

        const query = {
            timestamp: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        if (ip) {
            query.ip = ip;
        }

        try {
            const metrics = await RequestLog.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: {
                            ip: '$ip',
                            failureReason: '$failureReason',
                        },
                        count: { $sum: 1 },
                        firstFailure: { $min: '$timestamp' },
                        lastFailure: { $max: '$timestamp' },
                    },
                },
            ]);

            // Cache the results
            cacheService.set(cacheKey, metrics);

            return metrics;
        } catch (error) {
            console.error('Error fetching metrics:', error);
            throw error;
        }
    }
}

module.exports = new MonitoringService(); 