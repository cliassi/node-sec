const expressMongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

module.exports = (app) => {
    app.use(expressMongoSanitize()); // Prevent NoSQL injection
    app.use(xss()); // Prevent XSS attacks
};
