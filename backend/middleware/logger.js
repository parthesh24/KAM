const fs = require('fs');
const path = require('path');

// Path to the log file
const logFilePath = path.join(__dirname, 'logs', 'requests.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

const logger = (req, res, next) => {
    const startTime = new Date().toISOString();

    // Log the request details
    const requestLog = `[${startTime}] Incoming Request: ${req.method} ${req.url}\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}\n`;

    // Append the request log to the file
    fs.appendFileSync(logFilePath, requestLog);

    // Capture the response data
    const oldSend = res.send;
    res.send = function (data) {
        const endTime = new Date().toISOString();
        const responseLog = `[${endTime}] Response Status: ${res.statusCode}\nResponse Body: ${data}\n\n`;

        // Append the response log to the file
        fs.appendFileSync(logFilePath, responseLog);

        oldSend.apply(res, arguments);
    };

    next();
};

module.exports = logger;
