const helmet = require('helmet');
const hpp = require('hpp');

exports.applySecurityHeaders = (app) => {
    app.use(helmet());
    app.use(hpp()); // Prevent HTTP Parameter Pollution
};
