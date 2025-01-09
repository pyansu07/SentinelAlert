const monitoringService = require('../services/monitoringService');

const validateRequest = (req, res, next) => {
    const requiredHeaders = ['authorization', 'content-type'];
    const missingHeaders = requiredHeaders.filter(
        header => !req.headers[header]
    );

    if (missingHeaders.length > 0) {
        monitoringService.logFailedRequest(
            req.ip,
            `Missing required headers: ${missingHeaders.join(', ')}`,
            req.headers,
            req.path
        );
        return res.status(400).json({
            error: 'Missing required headers',
            details: missingHeaders,
        });
    }

    // Validate access token
    const token = req.headers.authorization;
    if (!token.startsWith('Bearer ') || !isValidToken(token.split(' ')[1])) {
        monitoringService.logFailedRequest(
            req.ip,
            'Invalid access token',
            req.headers,
            req.path
        );
        return res.status(401).json({ error: 'Invalid access token' });
    }

    next();
};

function isValidToken(token) {
    // Implement your token validation logic here
    return token === process.env.VALID_TOKEN;
}

module.exports = validateRequest; 