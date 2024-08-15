const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const hpp = require('hpp');
const session = require('express-session');
const connectDB = require('./config/database');
const { applySecurityHeaders } = require('./middlewares/secureHeaders');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Security headers
applySecurityHeaders(app);

// Middlewares
app.use(cors());  // Enable CORS
app.use(express.json({ limit: '10kb' }));  // Limit request size
app.use(cookieParser());  // Parse cookies
app.use(expressMongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(compression()); // Compress responses
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, sameSite: 'strict' }
}));

// CSRF protection
app.use(csurf({ cookie: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
