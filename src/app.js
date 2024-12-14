const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./utils/privateRoutes'); // Import the private routes from utils

const { PORT } = require('./config/env');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes); // Use the private routes

// Serve main website overview
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});