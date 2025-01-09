# Request Monitoring System

A robust Node.js application designed to monitor HTTP requests, track failed attempts, and alert administrators about potential security threats. The system includes rate limiting, request validation, and metrics collection capabilities.

## 🚀 Features

- **Request Validation**: Validates incoming requests for required headers and authorization tokens
- **Rate Limiting**: Prevents abuse by limiting requests per IP address
- **Failed Request Tracking**: Monitors and logs failed request attempts
- **Email Alerts**: Sends notifications when suspicious activity is detected
- **Metrics Collection**: Provides detailed metrics about request patterns
- **Clustering**: Utilizes multiple CPU cores for improved performance
- **Caching**: Implements in-memory caching for optimized performance

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis (optional, for distributed caching)
- SMTP access (for email alerts)

## 🛠️ Installation

1. Clone the repository:
`
git clone https://github.com/yourusername/request-monitoring-system.git
cd request-monitoring-system
`

2. Install dependencies:
`
npm install
`

3. Create a `.env` file in the root directory with the following configuration:
`
MONGODB_URI=mongodb://localhost:27017/request-monitor
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
ALERT_EMAIL_TO=alert-recipient@gmail.com
VALID_TOKEN=your-valid-token
PORT=3000
`

## ⚙️ Configuration

The application can be configured through `config/config.js`. Key configuration options include:
`
{
    monitoring: {
        timeWindowMinutes: 10,        // Time window for tracking failed attempts
        failureThreshold: 5,          // Number of failures before alerting
        requestsPerSecondLimit: 500   // Rate limiting threshold
    }
}
`
## 🚦 Usage
### Starting the Application
`
# Development mode
npm run dev

# Production mode with clustering
npm start
`
### API Endpoints
#### Submit Request
`
POST /api/submit
Content-Type: application/json
Authorization: Bearer your-token

{
  "data": "your-data"
}
`
#### Get Metrics
`
GET /metrics?startDate=2024-01-01&endDate=2024-01-02&ip=optional-ip-address
`

### Testing Rate Limiting

The repository includes a test script to simulate multiple requests:
`
node test-rate-limit.js

`


## 🏗️ Architecture

The application is built with the following components:

- **Express.js**: Web framework for handling HTTP requests
- **Mongoose**: MongoDB object modeling and data management
- **Node-cache**: In-memory caching for improved performance
- **Nodemailer**: Email service for sending alerts
- **Cluster**: Node.js clustering for scalability

## 📊 Monitoring and Metrics

The system tracks:
- Failed request attempts
- IP addresses of suspicious activity
- Request patterns and trends
- System performance metrics

## 🔒 Security Features

- Request validation middleware
- Rate limiting per IP address
- Token-based authentication
- Suspicious activity monitoring
- Email alerts for security threats

## 👥 Authors

- Your Name - Initial work - [YourGithub](https://github.com/pyasnu07)

## 🙏 Acknowledgments

- Node.js community
- Express.js community
- MongoDB community


---

**Note**: Remember to replace sensitive information in the `.env` file with your own credentials and never commit sensitive data to version control.
