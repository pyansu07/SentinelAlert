const nodemailer = require('nodemailer');
const config = require('../config/config');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(config.email.smtp);
    }

    async sendAlert(ip, failedAttempts, timeWindow) {
        const mailOptions = {
            from: config.email.from,
            to: config.email.to,
            subject: `Alert: Multiple Failed Requests from IP ${ip}`,
            text: `
        Warning: Multiple failed POST requests detected
        
        IP Address: ${ip}
        Failed Attempts: ${failedAttempts}
        Time Window: ${timeWindow} minutes
        Timestamp: ${new Date().toISOString()}
        
        Please investigate this activity as it might indicate a potential security threat.
      `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending email alert:', error);
            return false;
        }
    }
}

module.exports = new EmailService(); 