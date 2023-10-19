require('dotenv').config()
const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

// Add middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

// Add routes
app.use('/auth/register', require('./routes/register'));
app.use('/auth/login', require('./routes/login'));

// Covers 404 errors
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html'))
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (req.accepts('json'))
        res.json({ message: '404 Not Found' });
    else
        res.type('txt').send('404 Not Found');
});

app.use(errorHandler);

mongoose.connection.on('error', err => {
    console.error(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

// Confirmation message
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
